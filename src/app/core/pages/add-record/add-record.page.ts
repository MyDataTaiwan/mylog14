import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickerController, ModalController,PopoverController, AlertController, LoadingController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Symptoms } from '../../classes/symptoms';
import { SnapshotService } from '../../services/snapshot.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from, defer, forkJoin, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GeolocationService } from '../../services/geolocation.service';
import { RecordFinishPage } from '../../components/record-finish/record-finish.page';

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
  btCIntegerList = this.genIntArr(35, 40).map(x => x.toString());
  btDecimalList = this.genIntArr(0, 9).map(x => `.${x}`);
  btUnitList = ['°C'];
  defaultBt = '-';
  defaultBtUnit = '°C';
  bt: string;
  btUnit: string;
  symptoms: Symptoms = new Symptoms();
  text = {
    recorded: '',
    ok: '',
  };
  recorded$: Observable<string>;
  ok$: Observable<string>;
  destroy$ = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
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

  async openModal() {
    const popover = await this.popoverController.create({
      component: RecordFinishPage,
      translucent: true,
    });
    return popover.present();
  }

  async presentBtPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
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
      ]
    };
    const picker = await this.pickerCtrl.create(options);
    await picker.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: '正在紀錄資料...',
      duration: 10000
    });
    loading.present();
    return Promise.resolve(loading);
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
    this.submitRecord().subscribe();
  }

  submitRecord(): Observable<boolean> {
    const loading$ = defer(() => from(this.presentLoading()));
    const snapRecord$ = this.snapshotService.snapRecord(+this.bt, this.btUnit, this.symptoms);
    return forkJoin([loading$, snapRecord$])
      .pipe(
        switchMap(([loadingElement, _]) => loadingElement.dismiss()),
        switchMap(() => this.openModal()),
        switchMap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$),
      );
  }

  resetPage() {
    this.bt = this.defaultBt;
    this.btUnit = this.defaultBtUnit;
    this.symptoms.setDefault();
  }

  // Create an integer array [start..end]
  private genIntArr(start: number, end: number, step = 1): number[] {
    return Array.from({ length: end - start + 1 }, (_, k) => start + k);
  }

}
