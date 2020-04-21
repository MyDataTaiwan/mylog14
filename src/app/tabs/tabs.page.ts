import { Component, AfterViewInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddRecordPage } from '../core/pages/add-record/add-record.page';
import { SnapshotService } from '../core/services/snapshot.service';
import { take, debounce, filter, switchMap } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import { EulaPage } from '../core/pages/eula/eula.page';
import { DataStoreService } from '../core/services/data-store.service';
import { UserData } from '../core/interfaces/user-data';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit {
  showDebugButton = false;
  eulaLoader$: Observable<UserData>;
  constructor(
    private dataStore: DataStoreService,
    private modalController: ModalController,
    private snapshotService: SnapshotService,
  ) {}

  ngAfterViewInit() {
    this.eulaLoader$ = this.dataStore.userData$
      .pipe(
        filter(userData => userData.eulaAccepted === false),
        switchMap(userData => this.presentEulaModal(userData)),
        switchMap(userData => this.dataStore.updateUserData(userData)),
      )
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

}
