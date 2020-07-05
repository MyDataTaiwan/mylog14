import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import {
  distinctUntilChanged, filter, map, switchMap, takeUntil,
  tap,
} from 'rxjs/operators';

import { ShopInfo } from '@core/interfaces/shop-info';
import { CouponService } from '@core/services/coupon.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss'],
})
export class ShopScannerComponent implements OnInit, OnDestroy {

  private readonly defaultShopInfo = {UUID: '', shopName: '', shopBranch: ''};
  private readonly destory$ = new Subject();
  public scanEnabled$ = new BehaviorSubject<boolean>(true);
  public shopInfo$ = new BehaviorSubject<ShopInfo>(this.defaultShopInfo);

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly modalCtrl: ModalController,
    public couponService: CouponService,
  ) { }

  daysRecorded$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => Object.keys(recordsByDate).length),
      map(num => `${num}`),
    );

  poolBalance$ = this.couponService.getPoolCurrentBalance()
    .pipe(
      map(num => `${num}`),
    );

  userBalance$ = this.couponService.getUserCurrentBalance()
    .pipe(
      map(num => `${num}`),
    );

  ngOnInit() {
      this.shopInfo$
      .pipe(
        filter(shopInfo => shopInfo.UUID !== ''),
        distinctUntilChanged((prev, curr) => prev.UUID === curr.UUID),
        tap(() => this.scanEnabled$.next(false)),
        switchMap(shopInfo => this.couponService.startRedeem(shopInfo)),
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

