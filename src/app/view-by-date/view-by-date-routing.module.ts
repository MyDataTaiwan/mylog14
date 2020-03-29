import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewByDatePage } from './view-by-date.page';

const routes: Routes = [
  {
    path: '',
    component: ViewByDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewByDatePageRoutingModule {}
