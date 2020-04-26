import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabCouponPage } from './tab-coupon.page';

const routes: Routes = [
  {
    path: '',
    component: TabCouponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCouponPageRoutingModule {}
