import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateDetailConditionPage } from './date-detail-condition.page';

const routes: Routes = [
  {
    path: '',
    component: DateDetailConditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateDetailConditionPageRoutingModule {}
