import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorizeFinishPage } from './categorize-finish.page';

const routes: Routes = [
  {
    path: '',
    component: CategorizeFinishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorizeFinishPageRoutingModule {}
