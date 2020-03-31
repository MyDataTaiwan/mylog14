import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddRecordPage } from '../add-record/add-record.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private modalController: ModalController,
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

  }

  async onClickRecordButton() {
    const data = await this.presentAddRecordModal();
    console.log(data);
  }

}
