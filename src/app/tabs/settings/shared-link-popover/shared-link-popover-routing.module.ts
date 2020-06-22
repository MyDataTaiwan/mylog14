import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedLinkPopoverPage } from './shared-link-popover.page';

const routes: Routes = [
  {
    path: '',
    component: SharedLinkPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedLinkPopoverPageRoutingModule {}
