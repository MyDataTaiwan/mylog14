import { Component, OnInit } from '@angular/core';
import { PickerController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Symptoms } from '../../interfaces/symptoms';
import { SnapshotService } from '../../services/snapshot.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Record } from '../../interfaces/record';
import { StorageService } from '../../services/storage.service';
import { map, switchMap } from 'rxjs/operators';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit {
  isShow = true;
  isSelect = true;
  isShow1 = true;
  isShow2 = true;
  isShow3 = true;
  btCIntegerList = this.genIntArr(35, 40).map(x => x.toString());
  btDecimalList = this.genIntArr(0, 9).map(x => `.${x}`);
  btUnitList = ['°C', '°F'];
  defaultBt = '-';
  defaultBtUnit = '°C';
  defaultCondition: Symptoms = {
    coughing: false,
    headache: false,
    runnyNose: false,
    soreThroat: false,
  };
  // list = [
  //   {
  //     date: "2020/03/28",
  //     day: 1,
  //     isShhow: true,
  //     temperature: 36.5,
  //     time: '09:11',
  //     cough:{
  //       name:"咳嗽",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     runny_nose:{
  //       name:"流鼻水",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     congestion:{
  //       name:"鼻塞",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     sneezing:{
  //       name:"打噴嚏",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     shortness_of_breath:{
  //       name:"呼吸不順",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     Tiredness:{
  //       name:"四肢無力/全身倦怠",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     loss_of_taste_or_smell:{
  //       name:"嗅覺/味覺遲鈍",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     diarrhea:{
  //       name:"腹瀉",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     abdominal_pain:{
  //       name:"腹痛",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     vomiting:{
  //       name:"嘔吐",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     chills:{
  //       name:"發冷、畏寒 ",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     muscle_or_joint_soreness:{
  //       name:"肌肉或關節痠痛",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     sore_throat:{
  //       name:"喉嚨癢/腫痛",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     thick_mucus_from_coughs:{
  //       name:"有痰",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     fever:{
  //       name:"發燒",
  //       isNote:false,
  //       note:"",
  //       state:false
  //     },
  //     isSelect: false,
  //   }]
  list = 
    {
      date: "2020/03/28",
      day: 1,
      isShhow: true,
      bodyTemperature: 36.5,
      time: '09:11',
      symptoms:[{
        id: "cough",
        name: "咳嗽",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "runny_nose",
        name: "流鼻水",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "congestion",
        name: "鼻塞",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "sneezing",
        name: "打噴嚏",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "shortness_of_breath",
        name: "呼吸不順",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "cough",
        name: "四肢無力/全身倦怠",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "loss_of_taste_or_smell",
        name: "嗅覺/味覺遲鈍",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "diarrhea",
        name: "腹瀉",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "abdominal_pain",
        name: "腹痛",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "vomiting",
        name: "嘔吐",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "chills",
        name: "發冷、畏寒 ",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "muscle_or_joint_soreness",
        name: "肌肉或關節痠痛",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "sore_throat",
        name: "喉嚨癢/腫痛",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "thick_mucus_from_coughs",
        name: "有痰",
        isNote: false,
        note: "",
        state: false
      },
      {
        id: "fever",
        name: "發燒",
        isNote: false,
        note: "",
        state: false
      }]
      }
      
  bt: string;
  btUnit: string;
  condition: Symptoms;
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
    private geolocationService: GeolocationService,
    private storageService: StorageService,
    private snapshotService: SnapshotService,
    private translate: TranslateService,
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
    this.snapshotService.createSnapshot()
      .pipe(
        map(snap => {
          const symp: Symptoms = {
            coughing: this.list.symptoms[0].state,
            runnyNose: this.list.symptoms[1].state,
            headache: false,
            soreThroat: false,
          };
          const record: Record = {
            bodyTemperature: +this.bt,
            bodyTemperatureUnit: this.btUnit,
            symptoms: symp,
            timestamp: snap.timestamp,
            locationStamp: snap.locationStamp,
          };
          return record;
        }),
        switchMap(record => {
          return this.storageService.saveRecord(record);
        }),
        map(() => {
          loading.dismiss();
          this.presentAlert();
        }),
      ).subscribe();
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
    return Array.from({ length: end - start + 1 }, (_, k) => start + k);
  }

}
