import { Component, OnInit ,NgZone} from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-tab-taiwan',
  templateUrl: './tab-taiwan.page.html',
  styleUrls: ['./tab-taiwan.page.scss'],
})
export class TabTaiwanPage implements OnInit {
	options: AnimationOptions = {
    // path: '/assets/lottie-animation.json',
    path: '/assets/lottie/rain.json',

  };
  optionsBG: AnimationOptions = {
    // path: '/assets/lottie-animation.json',
    path: '/assets/lottie/island.json',

  };
  

  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  play(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }

  
}
