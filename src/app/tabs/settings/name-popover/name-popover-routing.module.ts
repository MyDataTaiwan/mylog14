import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamePopoverPage } from './name-popover.page';

const routes: Routes = [
  {
    path: '',
    component: NamePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamePopoverPageRoutingModule { }
