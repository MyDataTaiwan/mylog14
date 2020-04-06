import { Component, OnInit, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-daily-overview',
  templateUrl: './daily-overview.component.html',
  styleUrls: ['./daily-overview.component.scss'],
})


export class DailyOverviewComponent implements OnInit {
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
  
  arry: [number, number][] = [[35, 36], [125, 184], [195, 246], [254, 306],[313,365],[372,420],[436,490],[494,548],[555,611],[613,670],[677,734],[740,792],[797,850],[860,902],[952,922],[999,1200]];
  // arry: [number, number][] = [[35, 36], [125, 184], [125, 246], [125, 306],[125,365],[125,420],[125,490],[125,548],[125,611],[125,670],[125,734],[125,792],[125,850],[125,902],[125,922],[999,1200]];

  options: AnimationOptions = {
    // path: '/assets/lottie-animation.json',
    path: '/assets/MyLog14BBT.json',
  };
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[this.items.length],true));
    this.day("12132");

  }
  ngOnChanges()	{
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
   

    console.log(animationItem);
    console.log("is animation");

    animationItem.playSegments(this.arry[this.items.length],true);
    this.ngZone.runOutsideAngular(() => animationItem.playSegments(this.arry[this.items.length],true));

        this.day("12132");


  }
  

  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }
  // BMSegmentStartEvent(t,this.firstFrame,this.totalFrames));

  // playSegments(): void {
  //   this.ngZone.runOutsideAngular(() => this.animationItem.playSegments([616, 674], true));
  // }
  day1(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[1], true));
  }
  day2(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[2],true));
  }
  day3(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[3],true));
  }
  day15(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[15],true));
  }

  day(data) {
    let days=this.items.length
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[days],true));
    console.log("to day animation"+data);

  }


  pause() {
    this.ngZone.runOutsideAngular(() => this.animationItem.pause());
  }
}

