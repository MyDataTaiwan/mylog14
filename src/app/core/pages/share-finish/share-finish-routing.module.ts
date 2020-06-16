import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareFinishPage } from './share-finish.page';

const routes: Routes = [
  {
    path: '',
    component: ShareFinishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareFinishPageRoutingModule { }
