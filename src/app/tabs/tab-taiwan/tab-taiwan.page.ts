import { Component, OnInit, NgZone, OnDestroy, } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { DataStoreService } from '../../core/services/data-store.service';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tab-taiwan',
  templateUrl: './tab-taiwan.page.html',
  styleUrls: ['./tab-taiwan.page.scss'],
})
export class TabTaiwanPage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  options: AnimationOptions = {
    // path: '/assets/lottie-animation.json',
    path: '/assets/lottie/rain.json',

  };
  optionsBG: AnimationOptions = {
    // path: '/assets/lottie-animation.json',
    path: '/assets/lottie/island.json',

  };
  drip = 0;
  drips = 0;

  isDisabled = false;

  private animationItem: AnimationItem;

  constructor(
    private ngZone: NgZone,
    public platform: Platform,
    public dataStore: DataStoreService,
  ) { }

  ngOnInit() {
    this.dataStore.dailydrips$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => this.drips = v);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  // play(): void {
  //   this.ngZone.runOutsideAngular(() => this.animationItem.play());
  // }
  play(days): void {
    
    // this.dataStore.dailydrips$.subscribe((v) => console.log('subscribe dailydrips: ', v.records.length));
    // this.dataStore.dailydrips$.subscribe((v) => console.log('subscribe dailydrips: ', v));
    // this.dataStore.dailyRecords$.subscribe((v) => console.log('got new heroes list: ', v));
    // this.dataStore.dailyRecords$.subscribe((v) => console.log('got new heroes list records: ', v.list[3].records));
    // this.dataStore.dailyRecords$.subscribe((v) => v.list.map((index => { console.log(index.records.length) })));
    // b.reduce((total,currentObj) =>total.a.length+ currentObj.a.length)
    // this.dataStore.dailyRecords$.subscribe((v) => v.list.reduce((total: any, currentObj: any) => {
    //   console.log(total.records.length + currentObj.records.length)
    //   this.drip = total.records.length + currentObj.records.length
    //   console.log("drip",this.drip)
    //   return {
    //     records: total.records.length + currentObj.records.length
    //   }
    // }, {
    //   records: 0
    // })
    // );


    this.drip = this.drip + 1
    console.log(days);
    if (days <= 1) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }

}
