import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  BehaviorSubject, combineLatest, defer, forkJoin, Observable,
  of, Subject,
} from 'rxjs';
import {
  distinctUntilChanged, filter, map, switchMap, takeUntil,
  tap,
} from 'rxjs/operators';

import { ShopInfo } from '@core/interfaces/shop-info';
import { RewardService } from '@core/services/reward.service';
import {
  BarcodeScanner, BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ModalService } from '@shared/services/modal.service';
import {
  PopoverButtonSet, PopoverIcon, PopoverService,
} from '@shared/services/popover.service';

import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';

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
  canRedeem = false;

  initRewardStatus$ = this.rewardService.initRewardStatus$;
  daysRecorded$ = this.rewardService.daysRecorded$
    .pipe(
      filter(value => value != null),
      map(value => `${value}`),
    );
  pool$ = this.rewardService.poolBalance$
    .pipe(
      filter(value => value != null),
      map(value => Math.floor(value / 20)),
      map(value => `${value}`),
    );
  userBalance$ = this.rewardService.userBalance$
    .pipe(
      filter(value => value != null),
      map(value => `${value}`),
    );
  canRedeem$ = combineLatest([this.pool$, this.userBalance$])
    .pipe(
      map(([pool, userBalance]) => (+pool >= 1 && +userBalance >= 20)),
    );

  constructor(
    private readonly barcodeScanner: BarcodeScanner,
    private readonly modalCtrl: ModalController,
    private readonly modalService: ModalService,
    private readonly platform: Platform,
    private readonly rewardService: RewardService,
    private readonly popoverService: PopoverService,
  ) { }

  ngOnInit() {
    this.rewardService.getBalance().subscribe();
    this.shopInfo$
      .pipe(
        filter(shopInfo => shopInfo.UUID !== ''),
        distinctUntilChanged((prev, curr) => prev.UUID === curr.UUID),
        tap(() => this.scanEnabled$.next(false)),
        switchMap(shopInfo => this.startRedeemWithLoadingPopover(shopInfo)),
        tap(() => this.shopInfo$.next(this.defaultShopInfo)),
        tap(() => this.scanEnabled$.next(true)),
        takeUntil(this.destory$),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destory$.next(true);
    this.destory$.complete();
  }

  getInitialReward() {
    this.rewardService.getInitReward()
      .pipe(
        tap(() => this.rewardService.refreshInitRewardStatus()),
        switchMap(() => this.rewardService.getBalance()),
      ).subscribe();
  }

  scan() {
    const getQRText$ = (this.platform.is('cordova')) ? this.getQRTextForCordova() : this.getQRTextForWeb();
    getQRText$
      .pipe(
        this.parseAndFilterInvalidQRText(),
        this.showShopInfoAndFilterCancel(),
        switchMap(shopInfo => this.startRedeemWithLoadingPopover(shopInfo)),
      ).subscribe();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }

  private showShopInfoAndFilterCancel() {
    return (source: Observable<ShopInfo>) => {
      return source.pipe(
        switchMap(shopInfo => forkJoin([this.showShopInfo(shopInfo), of(shopInfo)])),
        filter(([data, _]) => data?.data?.redeem),
        map(([_, shopInfo]) => shopInfo),
      );
    };
  }

  private parseAndFilterInvalidQRText() {
    return (source: Observable<string>) => {
      return source.pipe(
        filter(data => data != null),
        map((data: string) => {
          let shopInfo: ShopInfo;
          try {
            shopInfo = JSON.parse(data);
          } catch (err) {
            console.warn(err);
            console.warn('QR Code ERROR: is not valid JSON format', data);
            return null;
          }
          if (!(shopInfo?.UUID && shopInfo?.shopName && shopInfo?.shopBranch)) {
            console.warn('QR Code ERROR: is not valid shopInfo', data);
            return null;
          }
          return shopInfo;
        }),
        filter(data => data != null),
      );
    };
  }

  private getQRTextForCordova(): Observable<string> {
    const options: BarcodeScannerOptions = {
      formats: 'QR_CODE',
      disableSuccessBeep: true,
    };
    return defer(() => this.barcodeScanner.scan(options))
      .pipe(
        map(barcodeData => barcodeData?.text),
        filter(text => text != null),
        map(text => text.replace('\\', '')),
      );
  }

  private getQRTextForWeb(): Observable<string> {
    return this.modalService.showModal(QrScannerComponent)
      .pipe(
        map(data => data?.data),
      );
  }

  private startRedeemWithLoadingPopover(shopInfo: ShopInfo) {
    return combineLatest([this.showRedeeming(), this.rewardService.redeem(shopInfo.UUID)])
      .pipe(
        switchMap(([popover, _]) => popover.dismiss()),
        switchMap(() => forkJoin([this.showRedeemSuccess(shopInfo), this.rewardService.getBalance()])),
      );
  }

  private showShopInfo(shopInfo: ShopInfo): Observable<any> {
    return this.popoverService.showPopover({
      i18nTitle: `${shopInfo.shopName}\n${shopInfo.shopBranch}`,
      i18nMessage: 'title.redeem20Confirm',
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
      i18nTitle: 'title.redeemSuccess',
      i18nMessage: `${shopInfo.shopName}\n${shopInfo.shopBranch} 折扣 20 元`,
      icon: PopoverIcon.CHECK,
    });
  }

}
