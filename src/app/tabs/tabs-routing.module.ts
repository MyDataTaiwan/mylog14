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
              import('../tab-data/tab-data.module').then(m => m.TabDataPageModule)
          },
          {
            path: 'daily-detail',
            loadChildren: () =>
              import('../daily/daily-detail/daily-detail.module').then(m => m.DailyDetailPageModule)
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
          },
          {
            path: 'bt-detail',
            loadChildren: () =>
              import('../bt-detail/bt-detail.module').then(m => m.BtDetailPageModule)
          },
          {
            path: 'symptom-detail',
            loadChildren: () =>
              import('../symptom-detail/symptom-detail.module').then(m => m.SymptomDetailPageModule)
          },
          {
            path: 'location-detail',
            loadChildren: () =>
              import('../location-detail/location-detail.module').then(m => m.LocationDetailPageModule)
          },
        ]
      },
      {
        path: 'tab-taiwan',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-taiwan/tab-taiwan.module').then( m => m.TabTaiwanPageModule)
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
