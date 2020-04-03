import { Component, OnInit } from '@angular/core';
import { PickerController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Condition } from '../../interfaces/condition';
import { SnapshotService } from '../../services/snapshot.service';
import { Snapshot } from '../../interfaces/snapshot';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RecordService } from '../../services/record.service';
import { Record } from '../../interfaces/record';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit {
  isShow=true;
  isShow1=true;
  isShow2=true;
  isShow3=true;
  btCIntegerList = this.genIntArr(35, 40).map(x => x.toString());
  btDecimalList = this.genIntArr(0, 9).map(x => `.${x}`);
  btUnitList = ['°C', '°F'];
  defaultBt = '-';
  defaultBtUnit = '°C';
  defaultCondition: Condition = {
    coughing: false,
    headache: false,
    runnyNose: false,
    soreThroat: false,
  };
  bt: string;
  btUnit: string;
  condition: Condition;
  text = {
    recorded: '',
    ok: '',
  };
  recorded$: Observable<string>;
  ok$: Observable<string>;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private pickerCtrl: PickerController,
    private record: RecordService,
    private snapshot: SnapshotService,
    private translate: TranslateService,
  ) {
    this.resetPage();
    this.recorded$ = this.translate.get('DAILY_RECORD.recorded');
    this.recorded$.subscribe((t: string) => this.text.recorded = t);
    this.ok$ = this.translate.get('DAILY_RECORD.ok');
    this.ok$.subscribe((t: string) => this.text.ok = t);
  }

  ngOnInit() {
    this.presentBtPicker();
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
            console.log(value);
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

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: this.text.recorded,
      cssClass: 'recordSaved',
      buttons: [
        {
          text: this.text.ok,
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }
      ]
    });

    await alert.present();
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

  async onSubmitClick() {
    const loading = await this.presentLoading();
    const snap = await this.snapshot.createSnapshot();
    const record: Record = {
      bodyTemperature: +this.bt,
      bodyTemperatureUnit: this.btUnit,
      condition: this.condition,
      snapshot: snap,
    };
    await this.record.createRecord(record);
    await loading.dismiss();
    await this.presentAlert();
  }

  resetPage() {
    this.bt = this.defaultBt;
    this.btUnit = this.defaultBtUnit;
    this.condition = {
      coughing: this.defaultCondition.coughing,
      headache: this.defaultCondition.headache,
      runnyNose: this.defaultCondition.runnyNose,
      soreThroat: this.defaultCondition.soreThroat,
    };
  }

  // Create an integer array [start..end]
  private genIntArr(start: number, end: number, step = 1): number[] {
    return Array.from({length: end - start + 1}, (_, k) => start + k);
  }

}
