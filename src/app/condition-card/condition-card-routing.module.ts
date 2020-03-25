import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConditionCardPage } from './condition-card.page';

const routes: Routes = [
  {
    path: '',
    component: ConditionCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConditionCardPageRoutingModule {}
