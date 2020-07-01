import { Injectable, ComponentRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { switchMap, map, delay } from 'rxjs/operators';
import { Observable, defer, from } from 'rxjs';
import { ShopScannerComponent } from '../components/shop-scanner/shop-scanner.component';
import { AddRecordComponent } from '../components/add-record/add-record.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly modalCtrl: ModalController,
  ) { }

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

  showShopScannerModal(): Observable<any> {
    return defer(() => this.modalCtrl.create({
      component: ShopScannerComponent,
      animated: true,
      backdropDismiss: false,
    }))
      .pipe(
        switchMap(modal => this.presentModal(modal)),
      );
  }

  private presentModal(modal: HTMLIonModalElement): Observable<any> {
    return defer(() => modal.present())
      .pipe(
        switchMap(() => from(modal.onDidDismiss())),
      );
  }
}
