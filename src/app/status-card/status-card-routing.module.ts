import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusCardPage } from './status-card.page';

const routes: Routes = [
  {
    path: '',
    component: StatusCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusCardPageRoutingModule {}
