import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged, filter, map, switchMap, takeUntil,
  tap,
} from 'rxjs/operators';

import { ShopInfo } from '@core/interfaces/shop-info';
import { RewardService } from '@core/services/reward.service';
import { ModalController } from '@ionic/angular';
import {
  PopoverButtonSet, PopoverIcon, PopoverService,
} from '@shared/services/popover.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent implements OnInit, OnDestroy {

  private readonly defaultShopInfo = { UUID: '', shopName: '', shopBranch: '' };
  private readonly destory$ = new Subject();
  public scanEnabled$ = new BehaviorSubject<boolean>(true);
  public shopInfo$ = new BehaviorSubject<ShopInfo>(this.defaultShopInfo);

  daysRecorded$ = this.rewardService.daysRecorded$
    .pipe(
      filter(value => value != null),
      map(value => `${value}`),
    );
  poolBalance$ = this.rewardService.poolBalance$
    .pipe(
      filter(value => value != null),
      map(value => `${value}`),
    );
  userBalance$ = this.rewardService.userBalance$
    .pipe(
      filter(value => value != null),
      map(value => `${value}`),
    );

  constructor(
    private readonly modalCtrl: ModalController,
    public rewardService: RewardService,
    private readonly popoverService: PopoverService,
  ) { }

  ngOnInit() {
    this.rewardService.getBalance().subscribe();
    this.shopInfo$
      .pipe(
        filter(shopInfo => shopInfo.UUID !== ''),
        distinctUntilChanged((prev, curr) => prev.UUID === curr.UUID),
        tap(() => this.scanEnabled$.next(false)),
        switchMap(shopInfo => this.startRedeemProcess(shopInfo)),
        tap(() => this.shopInfo$.next(this.defaultShopInfo)),
        tap(() => this.scanEnabled$.next(true)),
        takeUntil(this.destory$),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();
  }

  startRedeemProcess(shopInfo: ShopInfo) {
    return forkJoin([this.showRedeeming(), this.rewardService.redeem(shopInfo.UUID)])
      .pipe(
        switchMap(([popover, _]) => popover.dismiss),
        switchMap(() => this.showRedeemSuccess(shopInfo)),
      );
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

  private showShopInfo(shopInfo: ShopInfo): Observable<any> {
    return this.popoverService.showPopover({
      i18nTitle: `${shopInfo.shopName}\n${shopInfo.shopBranch}`,
      i18nMessage: '是否兌換 20 元',
      buttonSet: PopoverButtonSet.CONFIRM,
      dataOnConfirm: { redeem: true },
      dataOnCancel: { redeem: false },
    });
  }

  private showRedeeming(): Observable<HTMLIonPopoverElement> {
    return this.popoverService.showPopoverManualDismiss({
      i18nTitle: 'title.redeeming',
      i18nMessage: '',
      icon: PopoverIcon.LOADING,
    });
  }

  private showRedeemSuccess(shopInfo: ShopInfo): Observable<HTMLIonPopoverElement> {
    return this.popoverService.showPopover({
      i18nTitle: '兌換成功',
      i18nMessage: `${shopInfo.shopName}\n${shopInfo.shopBranch} 折扣 20 元`,
      icon: PopoverIcon.CHECK,
    });
  }

}
