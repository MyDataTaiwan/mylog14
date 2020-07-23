import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharePage } from './share.page';

const routes: Routes = [
  {
    path: '',
    component: SharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharePageRoutingModule {}
