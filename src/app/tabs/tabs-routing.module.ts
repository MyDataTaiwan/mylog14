import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-data',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-data/tab-data.module').then(m => m.TabDataPageModule)
          },
          {
            path: 'daily-detail/:day',
            loadChildren: () =>
              import('../daily/daily-detail/daily-detail.module').then(m => m.DailyDetailPageModule)
          },
          {
            path: 'category-bt',
            loadChildren: () =>
              import('../category/category-bt/category-bt.module').then(m => m.CategoryBtPageModule)
          },
          {
            path: 'category-symptoms',
            loadChildren: () =>
              import('../category/category-symptoms/category-symptoms.module').then(m => m.CategorySymptomsPageModule)
          },
          {
            path: 'category-location',
            loadChildren: () =>
              import('../category/category-location/category-location.module').then(m => m.CategoryLocationPageModule)
          },
          {
            path: 'category-pending',
            loadChildren: () =>
              import('../category/category-pending/category-pending.module').then(m => m.CategoryPendingPageModule)
          },
        ]
      },
      {
        path: 'tab-taiwan',
        children: [
          {
            path: '',
            loadChildren: () => import('./tab-taiwan/tab-taiwan.module').then( m => m.TabTaiwanPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-data',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-data',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
