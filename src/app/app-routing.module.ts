import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-record',
    loadChildren: () => import('./add-record/add-record.module').then( m => m.AddRecordPageModule)
  },
  {
    path: 'categorize-finish',
    loadChildren: () => import('./categorize-finish/categorize-finish.module').then( m => m.CategorizeFinishPageModule)
  },
  {
    path: 'tab-taiwan',
    loadChildren: () => import('./tab-taiwan/tab-taiwan.module').then( m => m.TabTaiwanPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
