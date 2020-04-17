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
    path: 'record-finish',
    loadChildren: () => import('./core/components/record-finish/record-finish.module').then( m => m.RecordFinishPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
