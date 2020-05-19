import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgViewerPage } from './img-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: ImgViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgViewerPageRoutingModule {}
