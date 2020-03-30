import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtDetailPage } from './bt-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BtDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtDetailPageRoutingModule {}
