import { Component, OnDestroy } from '@angular/core';

import { defer, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UserData } from '@core/interfaces/user-data';
import { PopoverController } from '@ionic/angular';
import {
  SharePopoverPage,
} from '@shared/components/share-popover/share-popover.page';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnDestroy {
  destroy$ = new Subject();
  selectedTab: string;
  showDebugButton = false;
  GuideLoader$: Observable<UserData>;
  constructor(
    private popoverCtrl: PopoverController,
    private modalService: ModalService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionTabsDidChange(event: TabsEvent) {
    this.selectedTab = event.tab;
  }

  onClickCameraButton() {
    return 0;
  }

  onClickRecordButton() {
    this.modalService.showAddRecordModal().subscribe();
  }

  onClickShareButton() {
    this.createSharePopover()
      .pipe(
        switchMap(popover => popover.present()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { }, e => console.log(e));
  }

  private createSharePopover(): Observable<HTMLIonPopoverElement> {
    return defer(() => this.popoverCtrl.create({
      component: SharePopoverPage,
    }));
  }

}

export interface TabsEvent {
  tab: string;
}
