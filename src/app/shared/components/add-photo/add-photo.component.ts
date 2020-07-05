import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  filter, first, map, switchMap, takeUntil,
  tap,
} from 'rxjs/operators';

import { Photo } from '@core/classes/photo';
import { PhotoService } from '@core/services/photo.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  private readonly photo = new BehaviorSubject<Photo>(null);
  photo$: Observable<Photo> = this.photo;
  photoUri$ = this.photo$
    .pipe(
      filter(photo => photo != null),
      map(photo => photo.getUri()),
    );

  proofDisplay = this.getDefaultProofDisplay();

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly photoService: PhotoService,
    private readonly modalCtrl: ModalController,
  ) { }

  ngOnInit() {
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
    this.proofDisplay = this.getDefaultProofDisplay();
    this.photoService.create()
      .pipe(
        first(),
        tap(photo => this.photo.next(photo)),
        switchMap(photo => this.photoService.attachProof(photo)),
        tap(photo => this.photo.next(photo)),
        tap(() => this.proofDisplay = this.getCompleteProofDisplay()),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  confirm() {
    this.dataStore.pushPhoto(this.photo.getValue())
      .pipe(
        first(),
        switchMap(() => this.modalCtrl.dismiss()),
      ).subscribe();
  }

  private getDefaultProofDisplay(): ProofDisplay {
    return {
      status: false,
      icon: 'shield-outline',
      color: 'black',
    };
  }

  private getCompleteProofDisplay() {
    return {
      status: true,
      icon: 'shield-checkmark-outline',
      color: 'primary',
    };
  }

}

interface ProofDisplay {
  status: boolean;
  icon: string;
  color: string;
}
