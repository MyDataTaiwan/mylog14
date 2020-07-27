import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { AnimationItem, AnimationOptions } from 'ngx-lottie/src/symbols';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  arry: [number, number][] = [[1, 3], [125, 184], [125, 246], [125, 306], [125, 365], [125, 420], [125, 490], [125, 548], [125, 611], [125, 670], [125, 734], [125, 792], [125, 850], [125, 902], [125, 922], [984, 1200], [35, 36]];
  STFarry: [number, number][] = [[1, 2],[170, 255],[265, 344],[359, 429],[441, 506],[519, 586],[600, 683], [758, 961]];

  options: AnimationOptions = {
    path: '/assets/MyLogHeartLoop.json',
  };

  TEMPimg: '/assets/imgA.png';
  private animationItem: AnimationItem;

  constructor(
    private readonly ngZone: NgZone,
    public modalService: ModalService,
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAnimationCreated(animationItem: AnimationItem) {
    this.animationItem = animationItem;
  }

  onConfigReady() {
    this.animationStopOnDay(0);
    
    // this.startCountdown(1)
    //   .pipe(
    //     takeUntil(this.destroy$),
    //   ).subscribe(() => console.log('Animation stopped'), err => console.log(err));
      
  }

  private startCountdown(day: number) {
    const idx = (day > 14) ? 15 : day + 1; // The animation array has +1 offset
    this.animationPlay(idx);

    if (idx !== 15) {
      return timer(idx * 1000)
        .pipe(
          tap(() => this.animationStopOnDay(idx)),
        );
    }
  }

  private animationPlay(idx: number) {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.arry[idx], true));
  }

  onClickAnimation() {
    this.modalService.showShopScannerModal()
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe();
  }

  private animationStopOnDay(idx: number) {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.STFarry[idx], true));
  }

}
