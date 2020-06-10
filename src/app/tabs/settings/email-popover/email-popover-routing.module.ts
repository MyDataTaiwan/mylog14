import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailPopoverPage } from './email-popover.page';

const routes: Routes = [
  {
    path: '',
    component: EmailPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailPopoverPageRoutingModule {}
