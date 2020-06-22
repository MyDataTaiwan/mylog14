import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShopScannerComponent } from '../components/shop-scanner/shop-scanner.component';
import { defer, Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { ShopInfo } from '../interfaces/shop-info';
import { PopoverService, PopoverIcon, PopoverButtonSet } from './popover.service';
import { PrivateCouponService } from '@numbersprotocol/private-coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly popoverService: PopoverService,
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
