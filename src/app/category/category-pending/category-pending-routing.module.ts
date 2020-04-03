import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPendingPage } from './category-pending.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPendingPageRoutingModule {}
