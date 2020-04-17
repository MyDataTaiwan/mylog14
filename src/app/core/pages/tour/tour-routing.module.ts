import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourPage } from './tour.page';

const routes: Routes = [
  {
    path: '',
    component: TourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourPageRoutingModule {}
