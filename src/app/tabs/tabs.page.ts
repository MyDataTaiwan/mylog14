import { Component, OnDestroy } from '@angular/core';

import { defer, Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { PopoverController } from '@ionic/angular';
import {
  SharePopoverPage,
} from '@shared/components/share-popover/share-popover.page';
import { ModalService } from '@shared/services/modal.service';
import { PopoverService } from '@shared/services/popover.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnDestroy {
  destroy$ = new Subject();
  selectedTab: string;
  constructor(
    private readonly popoverCtrl: PopoverController,
    private readonly popoverService: PopoverService,
    private readonly modalService: ModalService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionTabsDidChange(event: TabsEvent) {
    this.selectedTab = event.tab;
  }

  onClickCameraButton() {
    this.modalService.showAddPhotoModal()
      .pipe(
        first(),
      ).subscribe();
  }

  onClickRecordButton() {
    this.modalService.showAddRecordModal()
      .pipe(
        first(),
      ).subscribe();
  }

  onClickShareButton() {
    this.showShareDisabledPopover()
      .pipe(
        first(),
      ).subscribe();
  }

  private showShareDisabledPopover() {
    return this.popoverService.showPopover({
      i18nTitle: 'title.shareDisabled',
      i18nMessage: 'description.shareDisabled',
    }, 2000, true);
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
