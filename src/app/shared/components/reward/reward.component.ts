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

  getInitialReward() {
    this.rewardService.getInitReward()
      .pipe(
        tap(() => this.rewardService.refreshInitRewardStatus()),
        switchMap(() => this.rewardService.getBalance()),
      ).subscribe();
  }

  startRedeemProcess(shopInfo: ShopInfo) {
    return combineLatest([this.showRedeeming(), this.rewardService.redeem(shopInfo.UUID)])
      .pipe(
        tap(() => console.log('forkjoin emit')),
        switchMap(([popover, _]) => popover.dismiss()),
        switchMap(() => this.showRedeemSuccess(shopInfo)),
      );
  }

  private parseAndFilterInvalidQRText() {
    return (source: Observable<string>) => {
      return source.pipe(
        filter(data => data != null),
        map((data: string) => {
          let shopInfo: ShopInfo;
          try {
            shopInfo = JSON.parse(data);
          } catch {
            console.warn('QR Code ERROR: is not valid JSON format');
            return null;
          }
          if (!(shopInfo?.UUID && shopInfo?.shopName && shopInfo?.shopBranch)) {
            console.warn('QR Code ERROR: is not valid shopInfo');
            return null;
          }
          return shopInfo;
        }),
        filter(data => data != null),
      );
    };
  }

  scan() {
    if (this.platform.is('cordova')) {
      const options: BarcodeScannerOptions = {
        formats: 'QR_CODE',
        disableSuccessBeep: true,
      };
      defer(() => this.barcodeScanner.scan(options))
        .pipe(
          map(barcodeData => barcodeData.text),
          map(text => text.replace('\\', '')),
          this.parseAndFilterInvalidQRText(),
          switchMap((shopInfo: ShopInfo) => forkJoin([this.showShopInfo(shopInfo), of(shopInfo)])),
          tap(e => console.log(e)),
          filter(([data, shopInfo]) => data?.data?.redeem),
          switchMap(([data, shopInfo]) => this.startRedeemProcess(shopInfo)),
          switchMap(() => this.rewardService.getBalance()),
        ).subscribe();
    } else {
      this.modalService.showQRScannerModal()
        .pipe(
          map(data => data?.data),
          this.parseAndFilterInvalidQRText(),
          switchMap((shopInfo: ShopInfo) => this.startRedeemProcess(shopInfo)),
          switchMap(() => this.rewardService.getBalance()),
        ).subscribe();
    }
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
