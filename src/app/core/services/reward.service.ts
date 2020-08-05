import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import {
  catchError, filter, map, switchMap, take,
  tap,
} from 'rxjs/operators';

import { UserData } from '@core/interfaces/user-data';
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
  private readonly initRewardStatusRefresher = new BehaviorSubject(0);
  initRewardStatus$ = combineLatest([this.daysRecorded$, this.initRewardStatusRefresher])
    .pipe(
      switchMap(([days, _]) => this.canGetInitialBalance()
        .pipe(
          catchError(() => of(null)),
          map(canGet => [days, canGet]),
        )
      ),
      filter(([days, canGet]) => days != null && canGet != null),
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
        switchMap(userCredential => this.privateCouponService.login(userCredential)),
      );
  }

  refreshInitRewardStatus(): void {
    this.initRewardStatusRefresher.next(0);
  }

  signup(email: string): Observable<UserData> {
    return this.createUserCredential(email)
      .pipe(
        switchMap(userCredential => this.dataStore.updateUserData({
          email: userCredential.email,
          uuid: userCredential.password,
        })
          .pipe(
            map(() => userCredential),
          )),
        switchMap(userCredential => this.privateCouponService.signup(userCredential)),
        catchError((signupError: HttpErrorResponse) => {
          if (signupError.error.reason === 'USED_EMAIL') {
            return this.login()
              .pipe(
                catchError(loginError => {
                  if (loginError?.error?.reason === 'WRONG_PASSWORD') {
                    throw new Error('error.emailUsed');
                  }
                  throw loginError;
                })
              );
          }
          throw signupError;
        }),
        map((userAuth: UserAuth) => ({ userId: userAuth?.userId })),
        switchMap(userDataPatch => this.dataStore.updateUserData(userDataPatch)),
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
