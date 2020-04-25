import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabTaiwanDetailsPage } from './tab-taiwan-details.page';

const routes: Routes = [
  {
    path: '',
    component: TabTaiwanDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabTaiwanDetailsPageRoutingModule {}
