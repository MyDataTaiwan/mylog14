import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { takeUntil, switchMap, tap, filter, distinctUntilChanged, map, take } from 'rxjs/operators';
import { ShopInfo } from '../../interfaces/shop-info';
import { CouponService } from '../../services/coupon.service';

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
    private readonly modalCtrl: ModalController,
    public couponService: CouponService,
  ) { }

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

