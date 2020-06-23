import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ShopScannerComponent } from '../components/shop-scanner/shop-scanner.component';

@Injectable({
  providedIn: 'root'
})
export class ShopScannerService {

  constructor(
    private readonly modalCtrl: ModalController,
  ) { }

  showShopScanner() {
    return this.createShopScanner()
      .pipe(
        switchMap(modal => this.presentShopScanner(modal)),
      );
  }

  private createShopScanner() {
    return defer(() => this.modalCtrl.create({
      backdropDismiss: false,
      component: ShopScannerComponent,
    }));
  }

  private presentShopScanner(modal: HTMLIonModalElement): Observable<any> {
    return defer(() => modal.present())
      .pipe(
        switchMap(() => modal.onDidDismiss()),
      );
  }
}
