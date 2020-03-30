import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewByCategoryPage } from './view-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: ViewByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewByCategoryPageRoutingModule {}
