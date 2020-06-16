import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyDetailPage } from './daily-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DailyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyDetailPageRoutingModule { }
