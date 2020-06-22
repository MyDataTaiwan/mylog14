import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverService, PopoverIcon, PopoverButtonSet } from '../../services/popover.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { takeUntil, switchMap, tap, filter, distinctUntilChanged, map, take } from 'rxjs/operators';
import { PrivateCouponService } from '@numbersprotocol/private-coupon';
import { ShopInfo } from '../../interfaces/shop-info';

@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss'],
})
export class ShopScannerComponent implements OnInit, OnDestroy {

  private readonly defaultShopInfo = {shop_id: '', name: '', tag: ''};
  private readonly destory$ = new Subject();
  public balance$ = this.getCurrentBalance();
  public scanEnabled$ = new BehaviorSubject<boolean>(true);
  public shopInfo$ = new BehaviorSubject<ShopInfo>(this.defaultShopInfo);

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly popoverService: PopoverService,
    private readonly privateCouponService: PrivateCouponService,
  ) { }

  ngOnInit() {
      this.shopInfo$
      .pipe(
        filter(shopInfo => shopInfo.shop_id !== ''),
        distinctUntilChanged((prev, curr) => prev.shop_id === curr.shop_id),
        tap(() => this.scanEnabled$.next(false)),
        switchMap(shopInfo => this.showShopInfo(shopInfo)),
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

  getCurrentBalance(): Observable<number> {
    return this.privateCouponService.poolBalance()
      .pipe(
        map((res: PoolBalanceResult) => res.response.current_balance),
        tap(res => console.log('PoolBalance result', res)),
      );
  }

  showShopInfo(shopInfo: ShopInfo) {
    return this.popoverService.showPopover({
      i18nTitle: `${shopInfo.name}\n${shopInfo.tag}`,
      i18nMessage: '是否兌換 20 元',
      buttonSet: PopoverButtonSet.CONFIRM,
      onConfirm: this.showRedeemSucces.bind(this, shopInfo),
    });
  }

  showRedeemSucces(shopInfo: ShopInfo) {
    return this.popoverService.showPopover({
      i18nTitle: '兌換成功',
      i18nMessage: `${shopInfo.name}\n${shopInfo.tag} 折扣 20 元`,
      icon: PopoverIcon.CHECK,
      buttonSet: PopoverButtonSet.CONFIRM,
    });
  }

}

export interface PoolBalanceResult {
  status: string;
  response: {
    accumulated_redeem_balance: number;
    current_balance: number;
  };
}
