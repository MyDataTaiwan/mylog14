import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorizeDataPage } from './categorize-data.page';

const routes: Routes = [
  {
    path: '',
    component: CategorizeDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorizeDataPageRoutingModule {}
