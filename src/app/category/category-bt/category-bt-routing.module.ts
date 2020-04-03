import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryBtPage } from './category-bt.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryBtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryBtPageRoutingModule {}
