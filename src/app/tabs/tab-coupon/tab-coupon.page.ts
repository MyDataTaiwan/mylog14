import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TabCouponVendorsPage } from '../tab-coupon-vendors/tab-coupon-vendors.page';

@Component({
  selector: 'app-tab-coupon',
  templateUrl: './tab-coupon.page.html',
  styleUrls: ['./tab-coupon.page.scss'],
})
export class TabCouponPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async presentVendorDetailsPage() {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: TabCouponVendorsPage,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return Promise.resolve(data);
  }

  async onClickVendorsDetails() {
    await this.presentVendorDetailsPage();
  }
}
