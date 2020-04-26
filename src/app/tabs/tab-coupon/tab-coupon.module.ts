import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabCouponPageRoutingModule } from './tab-coupon-routing.module';

import { TabCouponPage } from './tab-coupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabCouponPageRoutingModule
  ],
  declarations: [TabCouponPage]
})
export class TabCouponPageModule {}
