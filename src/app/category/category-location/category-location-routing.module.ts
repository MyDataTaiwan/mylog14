import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryLocationPage } from './category-location.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryLocationPageRoutingModule {}
