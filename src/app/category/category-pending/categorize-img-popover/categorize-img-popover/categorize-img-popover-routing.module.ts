import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorizeImgPopoverPage } from './categorize-img-popover.page';

const routes: Routes = [
  {
    path: '',
    component: CategorizeImgPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorizeImgPopoverPageRoutingModule {}
