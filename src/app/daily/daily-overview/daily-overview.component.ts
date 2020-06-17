import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Observable, from, defer, forkJoin, Subject, concat, pipe, timer, zip, of } from 'rxjs';
import { RecordFinishPage } from '../../core/components/record-finish/record-finish.page';
import { ImgPopoverPage } from '../../core/pages/img-popover/img-popover.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-daily-overview',
  templateUrl: './daily-overview.component.html',
  styleUrls: ['./daily-overview.component.scss'],
})

export class DailyOverviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  items$ = new Observable<CardItem[]>();
  cachedDateDiff = -10;

  WhatIsItToday = 0;

  arry: [number, number][] = [[1, 3], [125, 184], [125, 246], [125, 306], [125, 365], [125, 420], [125, 490], [125, 548], [125, 611], [125, 670], [125, 734], [125, 792], [125, 850], [125, 902], [125, 922], [984, 1200], [35, 36]];
  STFarry: [number, number][] = [[1, 3], [245, 246], [305, 306], [364, 365], [419, 420], [489, 490], [547, 548], [610, 611], [669, 670], [733, 734], [791, 792], [849, 850], [901, 902], [921, 922], [984, 1200], [35, 36]];

  options: AnimationOptions = {
    path: '/assets/MyLogBBTfix.json',
  };

  TEMPimg: '/assets/imgA.png';
  private animationItem: AnimationItem;
  private isAnimationCreated: boolean = false;
  emptyCardItem = {
    hasData: false,
    day: null,
    month: null,
    date: null,
    bt: null,
    imgSrc: null,
    imgHeight: null,
  };

  constructor(
    public dataStore: DataStoreService,
    private popoverController: PopoverController,
    private ngZone: NgZone
  ) {
    this.items$ = this.dataStore.overviewCards$
      .pipe(
        map(cards => cards.reverse()),
      );
  }

  ngOnInit() {

  }
 /////// FIXME Debug ui start

  async open() {
    
       this.popoverController.dismiss({});
  
    const modal = await this.popoverController.create({
      component: RecordFinishPage,
      translucent: true,
      componentProps: {type:"fail",text:"驗證失敗",showBar:false}
      // componentProps: {type:"ok", bottomBar:"ture",comp:<RecordFinishPage> }
    });
    return await modal.present();
  }
  async openEX() {
    this.popoverController.dismiss({});

    const modal = await this.popoverController.create({
      component: RecordFinishPage,
      translucent: true,
      componentProps: {type:"confirm",text:"兌換成功",showBar:true}
      // componentProps: {type:"ok", bottomBar:"ture",comp:<RecordFinishPage> }
    });
    return await modal.present();
  }
  async openSelect() {
    this.popoverController.dismiss({});

    const modal = await this.popoverController.create({
      component: RecordFinishPage,
      translucent: true,
      componentProps: {type:"Select",text:"是否兌換 20 元",Select:"true"}
      // componentProps: {type:"ok", bottomBar:"ture",comp:<RecordFinishPage> }
    });
    return await modal.present();
  }
/////// FIXME Debug ui end


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAnimationCreated(animationItem: AnimationItem) {
    this.animationItem = animationItem;
  }

  onConfigReady() {
    this.dataStore.userData$
      .pipe(
        map(userData => userData.startDate),
        map(startDate => this.dateDiff((new Date(startDate)).getTime(), Date.now())),
        map(dateDiff => isNaN(dateDiff) ? -1 : dateDiff),
        filter(dateDiff => this.cachedDateDiff !== dateDiff), // Don't trigger animation if dateDiff is not changed
        tap(dateDiff => this.cachedDateDiff = dateDiff),
        switchMap(dateDiff => this.startCountdown(dateDiff)),
        takeUntil(this.destroy$),
      ).subscribe(() => console.log('Animation stopped'), err => console.log(err));
  }

  private startCountdown(day: number) {
    const idx = (day > 14) ? 15 : day + 1; // The animation array has +1 offset
    this.WhatIsItToday = idx;
    this.animationPlay(idx);

    if (idx != 15) {
      return timer(idx * 1000)
        .pipe(
          tap(() => this.animationStopOnDay(idx)),
        );
    }
  }

  private animationPlay(idx: number) {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[idx], true));
  }

  goToLink(url: string) {
    const date = this.WhatIsItToday;
    if (date >= 14) {
      window.open(url, "_blank");
    }
  }

  private animationStopOnDay(idx: number) {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.STFarry[idx], true));
  }

  private dateDiff(current: number, end: number): number {
    return Math.floor((end - current) / (1000 * 3600 * 24));
  }

}

export interface CardItem {
  hasData: boolean;
  day?: string;
  month?: string;
  date?: string;
  bt?: string;
  imgSrc?: string;
  imgHeight?: number;
}
