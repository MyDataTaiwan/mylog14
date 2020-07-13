import { Injectable } from '@angular/core';

import {
  BehaviorSubject, combineLatest, forkJoin, Observable, of,
  Subject,
} from 'rxjs';
import {
  first, map, retry, switchMap, take,
  tap,
} from 'rxjs/operators';

import {
  PrivateCouponService, UserDetailResult, UserResult,
} from '@numbersprotocol/private-coupon';

import {
  PopoverButtonSet, PopoverIcon, PopoverService,
} from '../../shared/services/popover.service';
import { ShopInfo } from '../interfaces/shop-info';
import { DataStoreService } from './store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  daysRecorded$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => Object.keys(recordsByDate).length),
    );
  daysRecordedStatus$: Observable<string> = this.daysRecorded$
    .pipe(
      map(daysRecorded => (daysRecorded != null && daysRecorded >= 0) ? 'valid' : 'invalid'),
    );
  poolBalance$ = new BehaviorSubject<number>(null);
  poolBalanceStatus$: Observable<string> = this.poolBalance$
    .pipe(
      map(poolBalance => (poolBalance != null && poolBalance >= 20) ? 'valid' : 'invalid'),
    );
  userBalance$ = new BehaviorSubject<number>(null);
  userBalanceStatus$: Observable<string> = this.userBalance$
    .pipe(
      map(userBalance => (userBalance != null && userBalance >= 20) ? 'valid' : 'invalid'),
    );

  redeemStatus$: Observable<string> = combineLatest([
    this.daysRecordedStatus$, this.poolBalanceStatus$, this.userBalanceStatus$
  ])
    .pipe(
      map(([a, b, c]) => (a === 'valid' && b === 'valid' && c === 'valid') ? 'valid' : 'invalid'),
    );

  private readonly reloadCouponInfo = new Subject();
  reloadCouponInfo$: Observable<any> = this.reloadCouponInfo
    .pipe(
      switchMap(() => this.initRewardIfNoBalance()),
      switchMap(() => this.getLatestBalance()),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly popoverService: PopoverService,
    private readonly privateCouponService: PrivateCouponService,
  ) {
    this.reloadCouponInfo$.subscribe();
  }

  reload() {
    this.reloadCouponInfo.next();
  }

  // If daysRecords >= 14 && current_balance is not initialized, give 20 points
  initRewardIfNoBalance() {
    const giveRewardIfNoBalance$ = this.login()
      .pipe(
        switchMap((userResult: UserResult) => this.privateCouponService.getUserDetail(
          userResult.response.user_id,
          userResult.response.token,
        )
          .pipe(
            map(userDetail => [userDetail, userResult.response.user_id, userResult.response.token]),
          )),
        switchMap(([userDetail, userId, token]: [UserDetailResult, string, string]) => {
          if (!userDetail.response.current_balance && !userDetail.response.accumulated_redeem_balance) {
            return this.privateCouponService.patchUserDetail(userId, token, { current_balance: 20 });
          } else {
            return of([]);
          }
        }),
      );
    return this.daysRecorded$
      .pipe(
        take(1),
        switchMap(daysRecorded => {
          if (daysRecorded >= 14) {
            return giveRewardIfNoBalance$;
          } else {
            return of([]);
          }
        })
      );
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
        retry(5),
        map((res: PoolBalanceResult) => res.response.current_balance),
      );
  }

  getUserCurrentBalance(): Observable<number> {
    return this.login()
      .pipe(
        switchMap(userResult => this.getUserDetail(userResult)),
        map((res: UserDetailResult) => res.response.current_balance),
      );
  }

  showShopInfo(shopInfo: ShopInfo): Observable<any> {
    return this.popoverService.showPopover({
      i18nTitle: `${shopInfo.shopName}\n${shopInfo.shopBranch}`,
      i18nMessage: '是否兌換 20 元',
      buttonSet: PopoverButtonSet.CONFIRM,
      dataOnConfirm: { redeem: true },
      dataOnCancel: { redeem: false },
    });
  }

  startRedeem(shopInfo: ShopInfo) {
    return this.showShopInfo(shopInfo)
      .pipe(
        switchMap(res => (res.data.redeem) ? this.redeem(shopInfo) : of([])),
        switchMap(() => this.getLatestBalance()),
      );
  }

  redeem(shopInfo: ShopInfo) {
    const redeem$ = this.login()
      .pipe(
        switchMap(userResult => this.getUserDetail(userResult)
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

  private login(): Observable<UserResult> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        map(userData => userData.email),
        switchMap(email => this.privateCouponService.login(email)),
        retry(5),
      );
  }

  private getUserDetail(userResult: UserResult): Observable<UserDetailResult> {
    return this.privateCouponService.getUserDetail(
      userResult.response.user_id,
      userResult.response.token,
    ).pipe(
      retry(5),
    );
  }
}

export interface PoolBalanceResult {
  status: string;
  response: {
    accumulated_redeem_balance: number;
    current_balance: number;
  };
}