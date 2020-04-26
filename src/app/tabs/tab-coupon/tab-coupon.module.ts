import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabCouponPageRoutingModule } from './tab-coupon-routing.module';

import { TabCouponPage } from './tab-coupon.page';
import { MainHeaderModule } from 'src/app/core/components/main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabCouponPageRoutingModule,
    MainHeaderModule,
  ],
  declarations: [TabCouponPage]
})
export class TabCouponPageModule {}
