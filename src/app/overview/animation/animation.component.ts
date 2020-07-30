import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { AnimationItem, AnimationOptions } from 'ngx-lottie/src/symbols';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DataStoreService } from '@core/services/store/data-store.service';
import { RewardComponent } from '@shared/components/reward/reward.component';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
})
export class AnimationComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  days$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => Object.keys(recordsByDate).length),
    );

  STFarry: [number, number][] = [[1, 2], [170, 255], [265, 344], [359, 429], [441, 506], [519, 586], [600, 683], [758, 961]];

  options: AnimationOptions = {
    path: '/assets/MyLogHeartLoop.json',
  };

  private animationItem: AnimationItem;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly modalService: ModalService,
    private readonly ngZone: NgZone,
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAnimationCreated(animationItem: AnimationItem) {
    this.animationItem = animationItem;
  }

  onConfigReady() {
    this.days$
      .pipe(
        map(days => (days) > 7 ? 7 : days),
        takeUntil(this.destroy$),
      )
      .subscribe(days => this.animationStopOnDay(days));
  }

  onClickAnimation() {
    this.modalService.showModal(RewardComponent)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe();
  }

  private animationStopOnDay(idx: number) {
    this.ngZone.runOutsideAngular(() => this.animationItem.playSegments(this.STFarry[idx], true));
  }

}
