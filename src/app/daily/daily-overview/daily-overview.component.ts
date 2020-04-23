import { Component, OnInit, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';

@Component({
  selector: 'app-daily-overview',
  templateUrl: './daily-overview.component.html',
  styleUrls: ['./daily-overview.component.scss'],
})


export class DailyOverviewComponent implements OnInit {
  items$ = new Observable<CardItem[]>();

  WhatIsItToday = 0;

  // arry= [[616, 674], [125, 184], [195, 246], [254, 306]]
  // TimeArry:{
  //   [616, 674], [125, 184], [195, 246], [254, 306]
  // }

  // arry: [number, number][] = [[35, 36], [125, 184], [195, 246], [254, 306], [313, 365], [372, 420], [436, 490], [494, 548], [555, 611], [613, 670], [677, 734], [740, 792], [797, 850], [860, 902], [952, 922], [999, 1200]];
  arry: [number, number][] = [[35, 36], [125, 184], [125, 246], [125, 306], [125, 365], [125, 420], [125, 490], [125, 548], [125, 611], [125, 670], [125, 734], [125, 792], [125, 850], [125, 902], [125, 922], [999, 1200]];
  STFarry: [number, number][] = [[35, 36], [183, 184], [245, 246], [305, 306], [364, 365], [419, 420], [489, 490], [547, 548], [610, 611], [669, 670], [733, 734], [791, 792], [849, 850], [901, 902], [921, 922], [999, 1200]];

  options: AnimationOptions = {
    // path: '/assets/lottie-animation.json',
    path: '/assets/MyLog14BBT.json',
  };

  TEMPimg:'/assets/imgA.png'
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
    private ngZone: NgZone
  ) {
    this.items$ = this.dataStore.overviewCards$
    .pipe(
        map(cards => cards.reverse()),
        tap((cardItems: CardItem[]) => {
          this.todate(cardItems.length);
        })
      );
  }

  ngOnInit() {
  }

  goToLink(url: string){
    const date = this.WhatIsItToday;
if(date>14){
  window.open(url, "_blank");
}
}
  AC($event) {
    this.animationCreated($event);
    this.today();
  }

  animationCreated(animationItem: AnimationItem) {
    this.animationItem = animationItem;
    console.log("is animation");
    console.log(animationItem);
    console.log("is animation");
  }

  async today() {
    // const data = this.items.length;
    // const data = 4;
    const data = this.WhatIsItToday;

    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[data], true))
    await new Promise((resolve) => {
      const timer = setInterval(() => {

        clearInterval(timer);
        resolve();

      }, (data) * 1000);
    });
    this.Stopday(data);
  }
  async todate(date) {
    // const data = this.items.length;
    // const data = 4;

    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[date], true))
    await new Promise((resolve) => {
      const timer = setInterval(() => {

        clearInterval(timer);
        resolve();

      }, (date) * 1000);
    });
    this.Stopday(date);
  }


  Stopday(data) {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.STFarry[data], true))
  }

  // async day(data) {
  //   await new Promise((resolve) => {
  //     const timer = setInterval(() => {
  //       if (this.isAnimationCreated) {
  //         clearInterval(timer);
  //         resolve();
  //       }
  //     }, 1);
  //   });
  //   console.log(this.isAnimationCreated);
  //   console.log("to day animation" + "dfdfd");

  //   this.ngZone.runOutsideAngular(() =>
  //     this.animationItem.playSegments(this.arry[this.items.length], true));
  // }


  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }
  day1(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[1], true));
  }
  day2(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[2], true));
  }
  day3(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[3], true));
  }
  day15(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[15], true));
  }



  pause() {
    this.ngZone.runOutsideAngular(() => this.animationItem.pause());
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
