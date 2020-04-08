import { Component, OnInit, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, } from 'ngx-lottie';
import { RecordService } from 'src/app/core/services/record.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { DailyRecord } from 'src/app/core/interfaces/daily-record';

@Component({
  selector: 'app-daily-overview',
  templateUrl: './daily-overview.component.html',
  styleUrls: ['./daily-overview.component.scss'],
})


export class DailyOverviewComponent implements OnInit {
  items$ = new Observable<CardItem[]>();
  items = [
    {
      day: 8,
      month: '03',
      date: '30',
      bt: 37.9,
      // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
      imgHeight: 300,
    },
    {
      day: 7,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 6,
      month: '03',
      date: '30',
      bt: 37.9,
      // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
      imgHeight: 300,
    },
    {
      day: 5,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 4,
      month: '03',
      date: '30',
      bt: 37.9,
      // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
      imgHeight: 300,
    },
    {
      day: 3,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 2,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 1,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 0,
      month: '00',
      date: '00',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    },
  ];
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
    public recordService: RecordService,
    private ngZone: NgZone
  ) {
    this.items$ = this.recordService.dailyRecords$
      .pipe(
        mergeMap(dailyRecords => {
          console.log('page dailyRecords', dailyRecords);
          return forkJoin(
            dailyRecords.map(dailyRecord => {
              if (dailyRecord.records.length === 0) {
                return this.emptyCardItem;
              }
              const cardItem: CardItem = {
                hasData: true,
                day: (14 - dailyRecord.countdown).toString(),
                month: dailyRecord.date.split('-')[1],
                date: dailyRecord.date.split('-')[2],
                bt: dailyRecord.records[0].bodyTemperature + dailyRecord.records[0].bodyTemperatureUnit,
                imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
                imgHeight: 400,
              };
              return cardItem;
            })
              .filter(cardItem => cardItem.hasData === true)
              .map(cardItem => of(cardItem))
          );
        }),
      );
  }

  ngOnInit() {
    this.items$.subscribe(r => console.log('items$ Map', r));
  }

  parseItemToReverseCountdown(dailyRecord: DailyRecord): string {
    console.log('countdown', dailyRecord.countdown);
    return (14 - dailyRecord.countdown).toString();
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
    const data = this.items.length;
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[data], true))
    await new Promise((resolve) => {
      const timer = setInterval(() => {

        clearInterval(timer);
        resolve();

      }, (data - 1) * 1000);
    });
    this.Stopday();
  }
  Stopday() {
    const data = this.items.length;
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.STFarry[data], true))
  }

  async day(data) {
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (this.isAnimationCreated) {
          clearInterval(timer);
          resolve();
        }
      }, 1);
    });
    console.log(this.isAnimationCreated);
    console.log("to day animation" + "dfdfd");

    this.ngZone.runOutsideAngular(() =>
      this.animationItem.playSegments(this.arry[this.items.length], true));
  }


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
