import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgPopoverPage } from './img-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ImgPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgPopoverPageRoutingModule { }
