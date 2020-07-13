import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import {
  map, mergeMap, switchMap, take, takeUntil,
  tap,
} from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { ProofStatus } from '@core/enums/proof-status.enum';
import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { Proof } from '@core/interfaces/proof';
import { PhotoService } from '@core/services/photo.service';
import { ProofService } from '@core/services/proof.service';
import { RecordService } from '@core/services/record.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '@shared/services/loading.service';
import { PopoverIcon, PopoverService } from '@shared/services/popover.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  private readonly record = new BehaviorSubject<Record>(new Record(Date.now()));
  record$: Observable<Record> = this.record;

  proofStatus = ProofStatus.LOADING;

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
    this.createProof().subscribe();
    this.takePhoto();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  takePhoto() {
    forkJoin([this.createEmptyRecord(), this.photoService.create()])
      .pipe(
        map(([record, byteString]) => {
          record.fields.find(field => field.type === RecordFieldType.photo).value = byteString;
          return record;
        }),
        tap(record => this.record.next(record)),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  confirm() {
    this.saveRecordWithLoading()
      .pipe(
        mergeMap(() => this.showRecordSavedPopover()),
        mergeMap(() => this.modalCtrl.dismiss()),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  private showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover({ i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM }, 500);
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

  private createEmptyRecord(): Observable<Record> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        switchMap(userData => this.recordService.create(userData.recordPreset)),
        tap(record => this.record.next(record)),
      );
  }

  private createProof() {
    return this.proofService.createProof()
      .pipe(
        tap(proof => this.updateRecordProof(proof)),
        tap(() => this.proofStatus = ProofStatus.COMPLETE),
        takeUntil(this.destroy$),
      );
  }

  private updateRecordProof(proof: Proof) {
    const record = this.record.getValue();
    record.setProof(proof);
    this.record.next(record);
  }

}

