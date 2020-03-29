import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateDetailOverviewPage } from './date-detail-overview.page';

const routes: Routes = [
  {
    path: '',
    component: DateDetailOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateDetailOverviewPageRoutingModule {}
