import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabCouponVendorsPage } from './tab-coupon-vendors.page';

const routes: Routes = [
  {
    path: '',
    component: TabCouponVendorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCouponVendorsPageRoutingModule {}
