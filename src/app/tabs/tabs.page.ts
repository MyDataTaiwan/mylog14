import { Component, OnDestroy } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { defer, interval, Observable, Subject } from 'rxjs';
import { debounce, switchMap, take, takeUntil } from 'rxjs/operators';
import { UserData } from '../core/interfaces/user-data';
import { GuidePage } from '../core/pages/guide/guide.page';
import { SharePage } from '../core/pages/share/share.page';
import { SnapshotService } from '../core/services/snapshot.service';
import { PopoverService } from '../core/services/popover.service';
import { FormService } from '../core/services/form.service';
import { ModalService } from '../core/services/modal.service';

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
    private snapshotService: SnapshotService,
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
    this.snapshotService.snapCapture()
  .pipe(
    debounce((() => interval(1000))),
    take(1),
  )
  .subscribe();
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

  private createSharePopover(): Observable < HTMLIonPopoverElement > {
  return defer(() => this.popoverCtrl.create({
    component: SharePage,
  }));
}

}

export interface TabsEvent {
  tab: string;
}
