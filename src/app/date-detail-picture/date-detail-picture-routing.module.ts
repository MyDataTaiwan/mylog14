import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateDetailPicturePage } from './date-detail-picture.page';

const routes: Routes = [
  {
    path: '',
    component: DateDetailPicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateDetailPicturePageRoutingModule {}
