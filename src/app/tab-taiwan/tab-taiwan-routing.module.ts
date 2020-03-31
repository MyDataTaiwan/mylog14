import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabTaiwanPage } from './tab-taiwan.page';

const routes: Routes = [
  {
    path: '',
    component: TabTaiwanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabTaiwanPageRoutingModule {}
