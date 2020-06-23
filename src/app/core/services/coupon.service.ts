import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { switchMap, tap, map, filter, first } from 'rxjs/operators';
import { ShopInfo } from '../interfaces/shop-info';
import { PopoverService, PopoverIcon, PopoverButtonSet } from './popover.service';
import { PrivateCouponService, UserResult, UserDetailResult } from '@numbersprotocol/private-coupon';
import { DataStoreService } from './data-store.service';
import { LoadingController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public poolBalance$ = new Subject<number>();
  public userBalance$ = new Subject<number>();
  redeemConfirmation = false;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly popoverCtrl: PopoverController,
    private readonly popoverService: PopoverService,
    private readonly privateCouponService: PrivateCouponService,
  ) {
    this.getLatestBalance().subscribe();
  }

  getLatestBalance() {
    const pool$ = this.getPoolCurrentBalance()
      .pipe(
        first(),
        tap(balance => this.poolBalance$.next(balance)),
      );
    const user$ = this.getUserCurrentBalance()
      .pipe(
        first(),
        tap(balance => this.userBalance$.next(balance)),
      );
    return forkJoin([pool$, user$]);
  }

  getPoolCurrentBalance(): Observable<number> {
    return this.privateCouponService.poolBalance()
      .pipe(
        map((res: PoolBalanceResult) => res.response.current_balance),
      );
  }

  getUserCurrentBalance(): Observable<number> {
    const email = this.dataStore.getUserData().email;
    return this.privateCouponService.login(email)
      .pipe(
        switchMap((userResult: UserResult) => this.privateCouponService.getUserDetail(
          userResult.response.user_id,
          userResult.response.token,
        )),
        map((res: UserDetailResult) => res.response.current_balance),
      );
  }

  showShopInfo(shopInfo: ShopInfo): Observable<HTMLIonPopoverElement> {
    return this.popoverService.showPopover({
      i18nTitle: `${shopInfo.shopName}\n${shopInfo.shopBranch}`,
      i18nMessage: '是否兌換 20 元',
      buttonSet: PopoverButtonSet.CONFIRM,
      onConfirm: this.confirmRedeem.bind(this),
    });
  }

  confirmRedeem() {
    this.redeemConfirmation = true;
  }

  startRedeem(shopInfo: ShopInfo) {
    return this.showShopInfo(shopInfo)
      .pipe(
        filter(_ => this.redeemConfirmation),
        switchMap(_ => this.redeem(shopInfo)),
        switchMap(_ => this.getLatestBalance()),
      );
  }

  redeem(shopInfo: ShopInfo) {
    const email = this.dataStore.getUserData().email;
    this.redeemConfirmation = false;
    const redeem$ = this.privateCouponService.login(email)
      .pipe(
        switchMap((userResult: UserResult) => this.privateCouponService.getUserDetail(
          userResult.response.user_id,
          userResult.response.token,
        )
          .pipe(
            map(userDetailResult => [userResult.response.token, userDetailResult.response.wallet_address]),
          )),
        switchMap(([token, address]) => this.privateCouponService.transaction(token, shopInfo.UUID, address, 20)),
      );

    return this.showRedeeming()
      .pipe(
        switchMap(redeemingPopover => redeem$.pipe(
          map(() => redeemingPopover),
        )),
        switchMap(redeemingPopover => redeemingPopover.dismiss()),
        switchMap(_ => this.showRedeemSuccess(shopInfo)),
      );
  }

  showRedeeming(): Observable<HTMLIonPopoverElement> {
    return this.popoverService.showPopoverManualDismiss({
      i18nTitle: 'title.redeeming',
      i18nMessage: '',
      icon: PopoverIcon.LOADING,
    });
  }

  showRedeemSuccess(shopInfo: ShopInfo): Observable<HTMLIonPopoverElement> {
    return this.popoverService.showPopover({
      i18nTitle: '兌換成功',
      i18nMessage: `${shopInfo.shopName}\n${shopInfo.shopBranch} 折扣 20 元`,
      icon: PopoverIcon.CHECK,
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