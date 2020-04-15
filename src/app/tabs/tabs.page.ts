import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddRecordPage } from '../core/pages/add-record/add-record.page';
import { SnapshotService } from '../core/services/snapshot.service';
import { take, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  showDebugButton = false;

  constructor(
    private modalController: ModalController,
    private snapshotService: SnapshotService,
  ) {}

  async presentAddRecordModal() {
    const modal = await this.modalController.create({
      component: AddRecordPage
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
