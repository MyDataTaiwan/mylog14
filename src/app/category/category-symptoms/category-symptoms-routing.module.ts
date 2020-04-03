import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorySymptomsPage } from './category-symptoms.page';

const routes: Routes = [
  {
    path: '',
    component: CategorySymptomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorySymptomsPageRoutingModule {}
