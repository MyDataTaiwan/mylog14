import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPendingPage } from './category-pending.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPendingPage,
    children: [
      {
        path: 'categorize-finish',
        loadChildren: () => import('./categorize-finish/categorize-finish.module').then(m => m.CategorizeFinishPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPendingPageRoutingModule {}
