import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PickerController, ModalController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { defer, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { delay, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Symptom } from '../../classes/symptom';
import { PopoverService, PopoverIcon } from '../../services/popover.service';
import { LoadingService } from '../../services/loading.service';
import { Record } from '../../classes/record';
import { RecordActionService } from '../../services/record-action.service';
import { RecordPreset } from '../../services/preset.service';
import { RecordFieldType, RecordField } from '../../interfaces/record-field';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit, OnDestroy {
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
  record$: Observable<Record> = this.recordActionService.create(RecordPreset.COMMON_COLD);
  recordFieldType = RecordFieldType;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly pickerCtrl: PickerController,
    private readonly translate: TranslateService,
    private readonly popoverService: PopoverService,
    private readonly recordActionService: RecordActionService,
    private readonly formService: FormService,
    private readonly modalCtrl: ModalController,
  ) {
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleChanged() {
  }

  editRecord(field: RecordField, templateName: string) {
    const formModel = {};
    formModel[field.name] = field.value;
    this.popoverService.showPopover({
      i18nTitle: `preset.${templateName}.${field.name}`,
      i18nMessage: '',
      formModel,
      formFields: this.formService.createFormFieldsByRecordField(field, templateName),
    }).subscribe();
  }

  showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500)
      .pipe(
        tap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$)
      );
  }

  async presentBtPicker() {
    const options: PickerOptions = {
      id: 'add_bt',
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

  showAddingDataLoading(): Observable<HTMLIonLoadingElement> {
    return this.translate.get('description.addingDataAndVerifiableInformation')
      .pipe(
        switchMap(msg => this.loadingService.showLoading(msg, 10000)),
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

  onCancelClick() {
    this.modalCtrl.dismiss();
  }

  onClearClick() {
    this.resetPage();
  }

  onSubmitClick() {
    this.submitRecord().subscribe(() => { });
  }

  submitRecord(): Observable<any> {
    return of([]);
    // FIXME: It's a dirty hack to add/remove expand value for symptoms view
    /*
    this.symptoms.list = this.symptomsView;
    this.symptoms.list.forEach((symptom: SymptomView) => delete symptom.expand);
    return forkJoin([
      this.showAddingDataLoading(),
      this.snapshotService.snapRecord(+this.bt, this.btUnit, this.symptoms),
    ])
      .pipe(
        switchMap(([loadingElement, _]) => loadingElement.dismiss()),
        switchMap(() => this.showRecordSavedPopover()),
        takeUntil(this.destroy$),
      );
      */
  }

  resetPage() {
    
  }

  // Create an integer array [start..end]
  private genIntArr(start: number, end: number, step = 1): number[] {
    return Array.from({ length: end - start + 1 }, (_, k) => start + k);
  }

}

export interface SymptomView extends Symptom {
  expand?: boolean;
}
