import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-record',
    loadChildren: () => import('./core/pages/add-record/add-record.module').then( m => m.AddRecordPageModule)
  },
  {
    path: 'tour',
    loadChildren: () => import('./core/pages/tour/tour.module').then( m => m.TourPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
