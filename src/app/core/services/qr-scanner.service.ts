import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShopScannerComponent } from '../components/shop-scanner/shop-scanner.component';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  // TODO: Reconsider how to manage the shop-scanner and coupon UI
  async showShopScanner() {
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: ShopScannerComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return Promise.resolve(data);
  }
}
