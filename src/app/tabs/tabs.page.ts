import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddRecordPage } from '../core/pages/add-record/add-record.page';
import { SnapshotService } from '../core/services/snapshot.service';
import { take, debounce, filter, switchMap, takeUntil } from 'rxjs/operators';
import { interval, Observable, defer, Subject } from 'rxjs';
import { EulaPage } from '../core/pages/eula/eula.page';
import { GuidePage } from '../core/pages/guide/guide.page';

import { DataStoreService } from '../core/services/data-store.service';
import { UserData } from '../core/interfaces/user-data';
import { SharePage } from '../core/pages/share/share.page';
import { UploadService } from '../core/services/upload.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit, OnDestroy {
  destroy$ = new Subject();
  selectedTab: string;
  showDebugButton = false;
  eulaLoader$: Observable<UserData>;

  constructor(
    private dataStore: DataStoreService,
    private modalController: ModalController,
    private popoverCtrl: PopoverController,
    private snapshotService: SnapshotService,
    private uploadService: UploadService,
  ) { }

  ngAfterViewInit() {
    this.eulaLoader$ = this.dataStore.userData$
      .pipe(
        filter(userData => userData.eulaAccepted === false),
        switchMap(userData => this.presentEulaModal(userData)),
        switchMap(userData => this.dataStore.updateUserData(userData)),
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();


  }

  ionTabsDidChange(event: TabsEvent) {
    this.selectedTab = event.tab;
  }
  async presentGuideModal() {
    const modal = await this.modalController.create({
      // translucent: true,
      backdropDismiss: false,
      component: GuidePage,
      // componentProps: { userData },
      cssClass: 'Guide-modal',
    });
    // await modal.present();
    // return await modal.present();
    // const { data } = await modal.onWillDismiss();
    // return Promise.resolve(data);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return Promise.resolve(data);
  }

  async presentAddRecordModal() {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: AddRecordPage,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return Promise.resolve(data);
  }

  async presentEulaModal(userData: UserData) {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: EulaPage,
      componentProps: { userData },
      cssClass: 'eula-modal',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return Promise.resolve(data);
  }

  onClickCameraButton() {
    this.snapshotService.snapCapture()
      .pipe(
        debounce((() => interval(1000))),
        take(1),
      )
      .subscribe();
  }

  async onClickRecordButton() {
    await this.presentAddRecordModal();
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
      component: SharePage,
    }));
  }

}

export interface TabsEvent {
  tab: string;
}
