import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable, Subject, timer } from 'rxjs';
import {
  map, mergeMap, retry, switchMap, take,
  takeUntil, tap,
} from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { ProofStatus } from '@core/enums/proof-status.enum';
import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { DataTemplateField } from '@core/interfaces/data-template-field';
import { Proof } from '@core/interfaces/proof';
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

  private readonly proof = new BehaviorSubject<Proof>({ timestamp: Date.now() });
  proof$: Observable<Proof> = this.proof;
  proofStatus = ProofStatus.LOADING;

  private readonly fieldGroups = new BehaviorSubject<DataTemplateField[][]>([]);
  fieldGroups$: Observable<DataTemplateField[][]> = this.fieldGroups;

  templateName$ = this.dataStore.dataTemplate$
    .pipe(
      map(dataTemplate => dataTemplate.templateName),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly loadingService: LoadingService,
    private readonly modalCtrl: ModalController,
    private readonly popoverService: PopoverService,
    private readonly recordService: RecordService,
    private readonly proofService: ProofService,
  ) {
  }

  ngOnInit() {
    this.createFieldGroupsFromDataTemplate()
      .subscribe(fieldGroups => this.fieldGroups.next(fieldGroups));
    this.fetchProof(60).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancelClicked() {
    this.modalCtrl.dismiss();
  }

  onClearClicked(): void {
    this.fieldGroups$
      .pipe(
        take(1),
        map(fieldGroups => fieldGroups.map(fieldGroup => fieldGroup.map(field => {
          field.value = null;
          return field;
        }))),
        tap(fieldGroups => this.fieldGroups.next(fieldGroups)),
      ).subscribe();
  }

  onSubmitClicked(): void {
    this.submitRecord().subscribe();
  }

  submitRecord(): Observable<any> {
    return this.createRecord()
      .pipe(
        mergeMap(record => this.saveRecordWithLoading(record)),
        mergeMap(() => this.showRecordSavedPopover()),
        mergeMap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$),
      );
  }

  private createRecord(): Observable<Record> {
    const fields$ = this.fieldGroups$
      .pipe(
        take(1),
        map(fieldGroups => [].concat.apply([], fieldGroups) as DataTemplateField[]),
      );
    return forkJoin([fields$, this.templateName$.pipe(take(1)), this.proof$.pipe(take(1))])
      .pipe(
        map(([fields, templateName, proof]) => {
          console.log(fields);
          const record = this.recordService.create(templateName);
          record.setProof(proof);
          fields.forEach(field => {
            const value = (field.value === undefined) ? null : field.value;
            record.setFieldValue(field.name, value);
          });
          return record;
        })
      );
  }

  private createFieldGroupsFromDataTemplate(): Observable<DataTemplateField[][]> {
    return this.dataStore.dataTemplate$
      .pipe(
        map(dataTemplate =>
          dataTemplate.dataGroups.map(dataGroup =>
            dataTemplate.fields.filter(field =>
              field.dataGroup === dataGroup)
          )
        ),
        takeUntil(this.destroy$),
      );
  }

  /**
   * @param intervalTime time in seconds
   */
  private fetchProof(intervalTime: number): Observable<Proof> {
    return timer(0, intervalTime * 1000)
      .pipe(
        tap(() => this.proofStatus = ProofStatus.LOADING),
        switchMap(() => this.proofService.createProof()),
        retry(5),
        tap(proof => this.proof.next(proof)),
        tap(() => this.proofStatus = ProofStatus.COMPLETE),
        takeUntil(this.destroy$),
      );
  }

  private saveRecordWithLoading(record: Record): Observable<any> {
    console.log('record', record);
    return forkJoin([
      this.loadingService.showLoading('description.addingDataAndVerifiableInformation', 10000),
      this.dataStore.pushRecord(record)
    ])
      .pipe(
        mergeMap(([loading, _]) => loading.dismiss()),
      );
  }

  private showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500);
  }

}
