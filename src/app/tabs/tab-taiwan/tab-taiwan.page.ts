import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-tab-taiwan',
  templateUrl: './tab-taiwan.page.html',
  styleUrls: ['./tab-taiwan.page.scss'],
})
export class TabTaiwanPage implements OnInit {
	options: AnimationOptions = {
    path: '/assets/lottie-animation.json',
    // path: '/assets/14Days.json',
	};
  constructor() { }

  ngOnInit() {
  }

	animationCreated(animationItem: AnimationItem): void {
		console.log(animationItem);
	}
}
