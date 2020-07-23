import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import {
  filter, map, mergeMap, switchMap, take,
  takeUntil, tap,
} from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { ProofStatus } from '@core/enums/proof-status.enum';
import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { FormService } from '@core/forms/form.service';
import { Proof } from '@core/interfaces/proof';
import { RecordField } from '@core/interfaces/record-field';
import { PhotoService } from '@core/services/photo.service';
import { ProofService } from '@core/services/proof.service';
import { RecordService } from '@core/services/record.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@shared/services/loading.service';
import { PopoverIcon, PopoverService } from '@shared/services/popover.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  private readonly record = new BehaviorSubject<Record>(new Record(Date.now()));
  record$: Observable<Record> = this.record;
  recordFieldType = RecordFieldType;

  private readonly edit = new Subject<[RecordField, string]>();
  edit$ = this.edit
    .pipe(
      switchMap(([field, templateName]) => {
        if (field.type === RecordFieldType.photo) {
          return this.photoService.create()
            .pipe(
              map(byteString => ({ [field.name]: byteString })),
            );
        } else {
          return this.editField(field, templateName)
            .pipe(
              map(result => result.data),
            );
        }
      }),
      filter(data => (data)),
      tap(data => this.updateRecordFields(data)),
      takeUntil(this.destroy$),
    );

  proofStatus = ProofStatus.LOADING;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly formService: FormService,
    private readonly loadingService: LoadingService,
    private readonly modalCtrl: ModalController,
    private readonly popoverService: PopoverService,
    private readonly recordService: RecordService,
    private readonly photoService: PhotoService,
    private readonly proofService: ProofService,
  ) {
  }

  ngOnInit() {
    this.loadEmptyRecord();
    this.edit$.subscribe();
    this.createProof().subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickEdit(field: RecordField, templateName: string) {
    if (field.type === this.recordFieldType.boolean) {
      field.value = !field.value;
    } else {
      this.edit.next([field, templateName]);
    }
  }

  private createProof() {
    return this.proofService.createProof()
      .pipe(
        tap(proof => this.updateRecordProof(proof)),
        tap(() => this.proofStatus = ProofStatus.COMPLETE),
        takeUntil(this.destroy$),
      );
  }

  private editField(field: RecordField, templateName: string): Observable<any> {
    const formModel = {};
    formModel[field.name] = field.value;
    return this.popoverService.showPopover({
      i18nTitle: `preset.${templateName}.${field.name}`,
      i18nMessage: '',
      formModel,
      formFields: this.formService.createFormFieldsByRecordField(field, templateName),
    });
  }

  onClickCancel() {
    this.modalCtrl.dismiss();
  }

  onClickClear() {
    this.loadEmptyRecord();
  }

  onClickSubmit() {
    this.submitRecord().subscribe(() => { });
  }

  submitRecord(): Observable<any> {
    return this.saveRecordWithLoading()
      .pipe(
        mergeMap(() => this.showRecordSavedPopover()),
        mergeMap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$),
      );
  }

  private saveRecordWithLoading(): Observable<any> {
    return forkJoin([
      this.loadingService.showLoading('description.addingDataAndVerifiableInformation', 10000),
      this.dataStore.pushRecord(this.record.getValue())
    ])
      .pipe(
        mergeMap(([loading, _]) => loading.dismiss()),
      );
  }

  private loadEmptyRecord() {
    this.dataStore.userData$
      .pipe(
        take(1),
        switchMap(userData => this.recordService.create(userData.recordPreset)),
        tap(record => this.record.next(record)),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  private showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500);
  }

  private updateRecordFields(data: any) {
    const record = this.record.getValue();
    for (const key of Object.keys(data)) {
      record.setFieldValue(key, data[key]);
    }
    this.record.next(record);
  }

  private updateRecordProof(proof: Proof) {
    const record = this.record.getValue();
    record.setProof(proof);
    this.record.next(record);
  }

}
