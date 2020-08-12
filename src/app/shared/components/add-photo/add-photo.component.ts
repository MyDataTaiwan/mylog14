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
import { PhotoService } from '@core/services/photo.service';
import { ProofService } from '@core/services/proof.service';
import { RecordService } from '@core/services/record.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@shared/services/loading.service';
import { PopoverIcon, PopoverService } from '@shared/services/popover.service';

// WORKAROUND: The component heavily violates DRY but is tolerable since the add-photo fab button is a deprecated feature

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  private readonly record = new BehaviorSubject<Record>(new Record(Date.now()));
  record$: Observable<Record> = this.record;

  private readonly proof = new BehaviorSubject<Proof>({ timestamp: Date.now() });
  proof$: Observable<Proof> = this.proof;
  proofStatus = ProofStatus.LOADING;

  private readonly fields = new BehaviorSubject<DataTemplateField[]>([]);
  fields$: Observable<DataTemplateField[]> = this.fields;

  templateName$ = this.dataStore.dataTemplate$
    .pipe(
      map(dataTemplate => dataTemplate.templateName),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly loadingService: LoadingService,
    private readonly photoService: PhotoService,
    private readonly recordService: RecordService,
    private readonly popoverService: PopoverService,
    private readonly modalCtrl: ModalController,
    private readonly proofService: ProofService,
  ) { }

  ngOnInit() {
    this.createFieldsFromDataTemplate()
      .pipe(
        tap(fields => this.fields.next(fields)),
        switchMap(() => this.takePhoto()),
      )
      .subscribe();
    this.fetchProof(60).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancelClicked() {
    this.modalCtrl.dismiss();
  }

  onConfirmClicked() {
    this.createRecord()
      .pipe(
        mergeMap(record => this.saveRecordWithLoading(record)),
        mergeMap(() => this.showRecordSavedPopover()),
        mergeMap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  onRetakeClicked(): void {
    this.takePhoto().subscribe();
  }

  takePhoto(): Observable<DataTemplateField[]> {
    return forkJoin([this.fields$.pipe(take(1)), this.photoService.create()])
      .pipe(
        map(([fields, byteString]) => {
          fields.find(field => field.type === RecordFieldType.photo).value = byteString;
          return fields;
        }),
        tap(fields => this.fields.next(fields)),
        takeUntil(this.destroy$),
      );
  }

  private createFieldsFromDataTemplate(): Observable<DataTemplateField[]> {
    return this.dataStore.dataTemplate$
      .pipe(
        take(1),
        map(dataTemplate => dataTemplate.fields),
        takeUntil(this.destroy$),
      );
  }

  private createRecord(): Observable<Record> {
    return forkJoin([this.fields$.pipe(take(1)), this.templateName$.pipe(take(1)), this.proof$.pipe(take(1))])
      .pipe(
        map(([fields, templateName, proof]) => {
          const record = this.recordService.create(templateName);
          record.setProof(proof);
          fields.forEach(field => record.setFieldValue(field.name, field.value || null));
          console.log(record);
          return record;
        })
      );
  }

  private showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500);
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

  /**
   * @param intervalTime time in seconds
   */
  private fetchProof(intervalTime: number) {
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

}

