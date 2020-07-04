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
            path: 'daily-detail/:date',
            loadChildren: () =>
              import('../daily-detail/daily-detail.module').then(m => m.DailyDetailPageModule)
          }
        ]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
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
export class TabsPageRoutingModule { }
