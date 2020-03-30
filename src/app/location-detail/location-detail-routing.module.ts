import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationDetailPage } from './location-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LocationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationDetailPageRoutingModule {}
