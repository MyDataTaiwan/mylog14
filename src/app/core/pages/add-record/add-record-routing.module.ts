import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecordPage } from './add-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRecordPageRoutingModule { }
