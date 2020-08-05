import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import {
  PrivateCouponService, UserAuth, UserCredential,
} from '@numbersprotocol/private-coupon';

import { DataStoreService } from './store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  daysRecorded$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => Object.keys(recordsByDate).length),
    );
  private readonly initRewardStatusRefresher$ = new BehaviorSubject(0);
  initRewardStatus$ = combineLatest([this.daysRecorded$, this.initRewardStatusRefresher$])
    .pipe(
      switchMap(([days, _]) => this.canGetInitialBalance()
        .pipe(
          map(canGet => [days, canGet]),
        )
      ),
      map(([days, canGet]) => {
        if (days < 7) {
          return 'pending';
        } else if (canGet) {
          return 'available';
        } else {
          return 'done';
        }
      })
    );
  private readonly poolBalance = new BehaviorSubject<number>(null);
  poolBalance$: Observable<number> = this.poolBalance;
  private readonly userBalance = new BehaviorSubject<number>(null);
  userBalance$: Observable<number> = this.userBalance;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly privateCouponService: PrivateCouponService,
  ) { }

  canGetInitialBalance(): Observable<boolean> {
    return this.login()
      .pipe(
        switchMap(userAuth => this.privateCouponService.canGetInitialBalance(userAuth)),
      );
  }

  createUserCredential(email: string): Observable<UserCredential> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        switchMap(userData => this.privateCouponService.createUserCredential(email, userData.uuid)),
      );
  }

  getUserCredential(): Observable<UserCredential> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        switchMap(userData => this.privateCouponService.createUserCredential(userData.email, userData.uuid)),
      );
  }

  getBalance(): Observable<[number, number]> {
    return forkJoin([this.updatePoolBalance(), this.updateUserBalance()]);
  }

  getInitReward(): Observable<any> {
    return this.login()
      .pipe(
        switchMap(userAuth => this.privateCouponService.giveInitialBalanceIfAvailable(userAuth)),
      );
  }

  login(): Observable<UserAuth> {
    return this.getUserCredential()
      .pipe(
        tap(e => console.log('userCredential', e)),
        switchMap(userCredential => this.privateCouponService.login(userCredential)),
      );
  }

  refreshInitRewardStatus(): void {
    this.initRewardStatusRefresher$.next(0);
  }

  signup(): Observable<UserAuth> {
    return this.getUserCredential()
      .pipe(
        switchMap(userCredential => this.privateCouponService.signup(userCredential)),
      );
  }

  redeem(shopId: string): Observable<any> {
    return this.login()
      .pipe(
        switchMap(userAuth => this.privateCouponService.redeem(userAuth, shopId)),
      );
  }

  private updatePoolBalance(): Observable<number> {
    return this.privateCouponService.getPoolCurrentBalance()
      .pipe(
        tap(value => this.poolBalance.next(value)),
      );
  }

  private updateUserBalance(): Observable<number> {
    return this.login()
      .pipe(
        switchMap(userAuth => this.privateCouponService.getUserCurrentBalance(userAuth)),
        tap(value => this.userBalance.next(value)),
      );
  }

}
