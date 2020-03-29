import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateDetailPage } from './date-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DateDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateDetailPageRoutingModule {}
