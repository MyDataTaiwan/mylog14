import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordFinishPage } from './record-finish.page';

const routes: Routes = [
  {
    path: '',
    component: RecordFinishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordFinishPageRoutingModule {}
