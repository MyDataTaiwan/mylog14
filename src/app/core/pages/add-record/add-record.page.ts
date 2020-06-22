import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { defer, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { delay, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Symptom } from '../../classes/symptom';
import { Symptoms } from '../../classes/symptoms';
import { DataStoreService } from '../../services/data-store.service';
import { GeolocationService } from '../../services/geolocation.service';
import { SnapshotService } from '../../services/snapshot.service';
import { PopoverService, PopoverIcon } from '../../services/popover.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit, OnDestroy {
  isShow = true;
  isSelect = true;
  isShow1 = true;
  isShow2 = true;
  isShow3 = true;
  btCIntegerList = this.genIntArr(34, 40).map(x => x.toString());
  btDecimalList = this.genIntArr(0, 9).map(x => `.${x}`);
  btUnitList = ['°C'];
  defaultBt = '-';
  defaultBtUnit = '°C';
  bt: string;
  btUnit: string;
  text = {
    recorded: '',
    ok: '',
    pickerTitle: '',
    cancel: '',
  };
  recorded$: Observable<string>;
  cancel$: Observable<string>;
  pickerTitle$: Observable<string>;
  ok$: Observable<string>;
  destroy$ = new Subject();
  symptoms = new Symptoms(true);
  symptomsView: SymptomView[] = this.symptoms.list;

  constructor(
    private dataStore: DataStoreService,
    private loadingCtrl: LoadingController,
    private location: Location,
    private pickerCtrl: PickerController,
    private geolocationService: GeolocationService,
    private snapshotService: SnapshotService,
    private translate: TranslateService,
    private popoverService: PopoverService,
  ) {
    this.resetPage();
    this.recorded$ = this.translate.get('title.recordSaved');
    this.recorded$.subscribe((t: string) => this.text.recorded = t);
    this.ok$ = this.translate.get('title.confirm');
    this.ok$.subscribe((t: string) => this.text.ok = t);
    this.pickerTitle$ = this.translate.get('title.addBodyTemperature');
    this.pickerTitle$.subscribe((t: string) => this.text.pickerTitle = t);
    this.cancel$ = this.translate.get('title.cancel');
    this.cancel$.subscribe((t: string) => this.text.cancel = t);

  }

  ngOnInit() {
    // Trigger location cache update
    this.geolocationService.getPosition().subscribe();
    this.presentBtPicker();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleChanged(toggledSymptom: Symptom) {
    this.symptomsView = this.symptomsView
      .map(symptomView => {
        if (symptomView.name === toggledSymptom.name) {
          symptomView.expand = symptomView.present;
          return symptomView;
        } else {
          symptomView.expand = false;
          return symptomView;
        }
      });
  }

  showRecordFinish(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500)
      .pipe(
        tap(() => this.location.back()),
        takeUntil(this.destroy$)
      );
  }

  async presentBtPicker() {
    const options: PickerOptions = {
      id: "add_bt",
      buttons: [
        {
          text: this.text.cancel,
          role: 'cancel'
        },
        {
          // text: 'Add Body Temperature',
          text: this.text.pickerTitle,
          handler: (value: any) => {
            return;
          },
          // cssClass: 'pickerClassDisable'
          cssClass: 'test',
        },
        {
          text: this.text.ok,
          handler: (value: any) => {
            this.bt = `${value.integer.value}${value.decimal.value}`;
            this.btUnit = value.unit.value;
          }
        }
      ],
      columns: [
        {
          name: 'integer',
          options: this.getColumnOptions(this.btCIntegerList)
        },
        {
          name: 'decimal',
          options: this.getColumnOptions(this.btDecimalList)
        },
        {
          name: 'unit',
          options: this.getColumnOptions(this.btUnitList)
        }
      ],
      mode: 'ios'
    };
    const picker = await this.pickerCtrl.create(options);
    await picker.present();
  }

  presentLoading() {
    return this.translate.get('description.addingDataAndVerifiableInformation')
      .pipe(
        switchMap(msg => {
          return defer(() => this.loadingCtrl.create({
            message: msg,
            duration: 10000,
          }));
        }),
        switchMap(loading => forkJoin([of(loading), loading.present()])),
      );
  }

  getColumnOptions(column: string[]) {
    const options = [];
    column.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  onBodyTemperatureClick() {
    this.presentBtPicker();
  }

  onClearClick() {
    this.resetPage();
  }

  onSubmitClick() {
    this.submitRecord().subscribe(() => { });
  }

  submitRecord(): Observable<any> {
    // FIXME: It's a dirty hack to add/remove expand value for symptoms view
    this.symptoms.list = this.symptomsView;
    this.symptoms.list.forEach((symptom: SymptomView) => delete symptom.expand);
    const loading$ = this.presentLoading();
    const snapRecord$ = this.snapshotService.snapRecord(+this.bt, this.btUnit, this.symptoms);
    return forkJoin([loading$, snapRecord$])
      .pipe(
        switchMap(([[loadingElement, _1], _]) => loadingElement.dismiss()),
        switchMap(() => this.showRecordFinish()),
        takeUntil(this.destroy$),
      );
  }

  resetPage() {
    this.bt = this.defaultBt;
    this.btUnit = this.defaultBtUnit;
    const defaultSchema = this.dataStore.getUserData().defaultSchema;
    this.symptoms.setDefault(defaultSchema);
    this.symptomsView = this.symptoms.list;
    this.symptomsView = this.symptomsView.map(symptomView => {
      symptomView.expand = false;
      return symptomView;
    });
  }

  // Create an integer array [start..end]
  private genIntArr(start: number, end: number, step = 1): number[] {
    return Array.from({ length: end - start + 1 }, (_, k) => start + k);
  }

}

export interface SymptomView extends Symptom {
  expand?: boolean;
}
