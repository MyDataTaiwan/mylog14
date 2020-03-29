import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-date',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-date/tab-date.module').then(m => m.TabDatePageModule)
          },
          {
            path: 'date-detail',
            loadChildren: () =>
              import('../date-detail/date-detail.module').then(m => m.DateDetailPageModule)
          },
        ]
      },
      {
        path: 'tab-category',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-category/tab-category.module').then(m => m.TabCategoryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-date',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-date',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
