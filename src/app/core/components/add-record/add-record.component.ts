import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { defer, forkJoin, from, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { delay, map, switchMap, take, takeUntil, tap, filter, first, mergeMap } from 'rxjs/operators';
import { PopoverService, PopoverIcon } from '../../services/popover.service';
import { LoadingService } from '../../services/loading.service';
import { Record } from '../../classes/record';
import { RecordActionService } from '../../services/record-action.service';
import { RecordField } from '../../interfaces/record-field';
import { RecordFieldType } from '../../enums/record-field-type.enum';
import { FormService } from '../../services/form.service';
import { UserDataRepositoryService } from '../../services/repository/user-data-repository.service';

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
      switchMap(([field, templateName]) => this.editField(field, templateName)),
      map(result => result.data),
      filter(data => (data)),
      tap(data => this.updateRecord(data)),
    );

  constructor(
    private readonly loadingService: LoadingService,
    private readonly userDataRepo: UserDataRepositoryService,
    private readonly popoverService: PopoverService,
    private readonly recordActionService: RecordActionService,
    private readonly formService: FormService,
    private readonly modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    this.loadEmptyRecord();
    this.edit$.subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickEdit(field: RecordField, templateName: string) {
    if (field.type !== this.recordFieldType.boolean) {
      this.edit.next([field, templateName]);
    }
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
    return forkJoin([
      this.loadingService.showLoading('description.addingDataAndVerifiableInformation', 10000),
      this.recordActionService.save(this.record.getValue()),
    ])
      .pipe(
        mergeMap(([loading, _]) => loading.dismiss()),
        mergeMap(() => this.showRecordSavedPopover()),
        tap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$),
      );
  }

  private loadEmptyRecord() {
    this.userDataRepo.get()
      .pipe(
        first(),
        switchMap(userData => this.recordActionService.create(userData.recordPreset)),
        tap(record => this.record.next(record)),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  private showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500);
  }

  private updateRecord(data: any) {
    const record = this.record.getValue();
    for (const key of Object.keys(data)) {
      record.setFieldValue(key, data[key]);
    }
    this.record.next(record);
  }

}

