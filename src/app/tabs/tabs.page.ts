import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AddRecordPage } from '../core/pages/add-record/add-record.page';
import { RecordService } from '../core/services/record.service';
import { PhotoService } from '../services/photo.service';
import { take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private alertCtrl: AlertController,
    private modalController: ModalController,
    private photoService: PhotoService,
    private record: RecordService,
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
    this.photoService.takePicture();
  }

  async onClickRecordButton() {
    const data = await this.presentAddRecordModal();
    console.log(data);
  }

  async onClickTestButton() {
    const data = await this.record.getRecords();
    await this.presentTestAlert(data);
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
