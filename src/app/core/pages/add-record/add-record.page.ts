import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickerController, ModalController, PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Symptoms } from '../../classes/symptoms';
import { SnapshotService } from '../../services/snapshot.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from, defer, forkJoin, Subject, concat, pipe, timer, zip, of } from 'rxjs';
import { switchMap, takeUntil, tap, delay, concatMap } from 'rxjs/operators';
import { GeolocationService } from '../../services/geolocation.service';
import { RecordFinishPage } from '../../components/record-finish/record-finish.page';
import { Location } from '@angular/common';
import { Symptom } from '../../classes/symptom';

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
  };
  recorded$: Observable<string>;
  ok$: Observable<string>;
  destroy$ = new Subject();
  symptoms = new Symptoms();
  symptomsView: SymptomView[] = this.symptoms.list;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private location: Location,
    private pickerCtrl: PickerController,
    private geolocationService: GeolocationService,
    private snapshotService: SnapshotService,
    private translate: TranslateService,
    public popoverController: PopoverController,

  ) {
    this.resetPage();
    this.recorded$ = this.translate.get('DAILY_RECORD.recorded');
    this.recorded$.subscribe((t: string) => this.text.recorded = t);
    this.ok$ = this.translate.get('DAILY_RECORD.ok');
    this.ok$.subscribe((t: string) => this.text.ok = t);
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

  showRecordFinish() {
    return defer(() => this.popoverController.create({
      component: RecordFinishPage,
      translucent: true,
    }))
      .pipe(
        switchMap(popover => forkJoin([
          this.displayPopoverForDuration(popover, 0.5),
          this.onPopoverDismissNavigateBack(popover),
        ])),
      );
  }

  private displayPopoverForDuration(popover: HTMLIonPopoverElement, seconds: number) {
    return from(popover.present())
      .pipe(
        delay(seconds * 1000),
        switchMap(() => popover.dismiss()),
      );
  }

  private onPopoverDismissNavigateBack(popover: HTMLIonPopoverElement) {
    return from(popover.onDidDismiss())
      .pipe(tap(() => this.location.back()));
  }

  async presentBtPicker() {
    const options: PickerOptions = {
      id: "add_bt",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: '新增體溫',
          handler: (value: any) => {
            return;
          },
          // cssClass: 'pickerClassDisable'
          cssClass: 'test',
        },
        {
          text: 'Ok',
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
      mode:'ios'
    };
    const picker = await this.pickerCtrl.create(options);
    await picker.present();
  }

  presentLoading() {
    return this.translate.get('DAILY_RECORD.saving')
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
    this.submitRecord().subscribe(() => {});
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
    this.symptoms.setDefault();
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
