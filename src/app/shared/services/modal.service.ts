import { Injectable } from '@angular/core';

import { defer, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { ModalController } from '@ionic/angular';
import {
  AddPhotoComponent,
} from '@shared/components/add-photo/add-photo.component';
import {
  AddRecordComponent,
} from '@shared/components/add-record/add-record.component';
import {
  PhotoViewerComponent,
} from '@shared/components/photo-viewer/photo-viewer.component';
import {
  QrScannerComponent,
} from '@shared/components/qr-scanner/qr-scanner.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly modalCtrl: ModalController,
  ) { }

  showAddPhotoModal(): Observable<any> {
    return defer(() => this.modalCtrl.create({
      component: AddPhotoComponent,
      animated: true,
      backdropDismiss: false,
    }))
      .pipe(
        switchMap(modal => this.presentModal(modal)),
      );
  }


  showAddRecordModal(): Observable<any> {
    return defer(() => this.modalCtrl.create({
      component: AddRecordComponent,
      animated: true,
      backdropDismiss: false,
    }))
      .pipe(
        switchMap(modal => this.presentModal(modal)),
      );
  }

  showQRScannerModal(): Observable<any> {
    return defer(() => this.modalCtrl.create({
      component: QrScannerComponent,
      animated: true,
      backdropDismiss: false,
    }))
      .pipe(
        switchMap(modal => this.presentModal(modal)),
      );
  }

  showPhotoViewerModal(record: Record): Observable<any> {
    return defer(() => this.modalCtrl.create({
      component: PhotoViewerComponent,
      componentProps: { record },
      animated: true,
      backdropDismiss: false,
    }))
      .pipe(
        switchMap(modal => this.presentModal(modal)),
      );
  }

  // FIXME: component & componentProps typing
  showModal(component: any, componentProps?: any): Observable<any> {
    return this.createModal(component, componentProps)
      .pipe(
        switchMap(modal => this.presentModal(modal)),
      );
  }

  // FIXME: component & componentProps typing
  private createModal(component: any, componentProps?: any): Observable<HTMLIonModalElement> {
    return defer(() => this.modalCtrl.create({
      component,
      componentProps,
      animated: true,
      backdropDismiss: false,
    }));
  }

  private presentModal(modal: HTMLIonModalElement): Observable<any> {
    return defer(() => modal.present())
      .pipe(
        switchMap(() => from(modal.onDidDismiss())),
      );
  }
}
