import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import {
  distinctUntilChanged, filter, switchMap, takeUntil, tap,
} from 'rxjs/operators';

import { ShopInfo } from '@core/interfaces/shop-info';
import { CouponService } from '@core/services/coupon.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss'],
})
export class ShopScannerComponent implements OnInit, OnDestroy {

  private readonly defaultShopInfo = { UUID: '', shopName: '', shopBranch: '' };
  private readonly destory$ = new Subject();
  public scanEnabled$ = new BehaviorSubject<boolean>(true);
  public shopInfo$ = new BehaviorSubject<ShopInfo>(this.defaultShopInfo);

  daysRecorded$ = this.couponService.daysRecorded$;
  daysRecordedStatus$ = this.couponService.daysRecordedStatus$;
  poolBalance$ = this.couponService.poolBalance$;
  poolBalanceStatus$ = this.couponService.poolBalanceStatus$;
  userBalance$ = this.couponService.userBalance$;
  userBalanceStatus$ = this.couponService.userBalanceStatus$;
  redeemStatus$ = this.couponService.redeemStatus$;

  constructor(
    private readonly modalCtrl: ModalController,
    public couponService: CouponService,
  ) { }

  ngOnInit() {
    this.couponService.reload();
    this.shopInfo$
      .pipe(
        filter(shopInfo => shopInfo.UUID !== ''),
        distinctUntilChanged((prev, curr) => prev.UUID === curr.UUID),
        tap(() => this.scanEnabled$.next(false)),
        switchMap(shopInfo => this.couponService.startRedeem(shopInfo)),
        tap(() => this.shopInfo$.next(this.defaultShopInfo)),
        tap(() => this.scanEnabled$.next(true)),
        takeUntil(this.destory$),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();
  }

  scanResultHandler(scanResult: string) {
    let shopInfo: ShopInfo;
    try {
      shopInfo = JSON.parse(scanResult);
    } catch {
      console.log('Failed to parse QRCode');
      shopInfo = this.defaultShopInfo;
    }
    this.shopInfo$.next(shopInfo);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }

}
