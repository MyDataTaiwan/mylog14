import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-diary',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-diary/tab-diary.module').then(m => m.TabDiaryPageModule)
          }
        ]
      },
      {
        path: 'tab-playground',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-playground/tab-playground.module').then(m => m.TabPlaygroundPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-diary',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-diary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
