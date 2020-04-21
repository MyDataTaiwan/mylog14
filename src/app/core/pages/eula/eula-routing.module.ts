import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EulaPage } from './eula.page';

const routes: Routes = [
  {
    path: '',
    component: EulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EulaPageRoutingModule {}
