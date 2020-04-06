import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddRecordPage } from '../core/pages/add-record/add-record.page';
import { SnapshotService } from '../core/services/snapshot.service';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private snapshotService: SnapshotService,
    private storage: StorageService,
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
    this.snapshotService.snapCapture();
  }

  async onClickRecordButton() {
    const data = await this.presentAddRecordModal();
    console.log(data);
  }

  async onClickTestButton() {
    this.storage.getRecords().subscribe(recordMeta => {
      console.log(recordMeta);
      this.presentTestAlert(recordMeta);
    });
  }

  // TODO: Remove this alert after we can view stored data elsewhere
  async presentTestAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Records',
      message: JSON.stringify(data, null, 2),
      buttons: ['OK']
    });

    await alert.present();
  }

}
