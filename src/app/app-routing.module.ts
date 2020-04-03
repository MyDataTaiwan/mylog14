import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'bt-detail',
    loadChildren: () => import('./bt-detail/bt-detail.module').then( m => m.BtDetailPageModule)
  },
  {
    path: 'location-detail',
    loadChildren: () => import('./location-detail/location-detail.module').then( m => m.LocationDetailPageModule)
  },
  {
    path: 'symptom-detail',
    loadChildren: () => import('./symptom-detail/symptom-detail.module').then( m => m.SymptomDetailPageModule)
  },
  {
    path: 'add-record',
    loadChildren: () => import('./add-record/add-record.module').then( m => m.AddRecordPageModule)
  },
  {
    path: 'categorize-data',
    loadChildren: () => import('./categorize-data/categorize-data.module').then( m => m.CategorizeDataPageModule)
  },
  {
    path: 'categorize-finish',
    loadChildren: () => import('./categorize-finish/categorize-finish.module').then( m => m.CategorizeFinishPageModule)
  },
  {
    path: 'tab-taiwan',
    loadChildren: () => import('./tab-taiwan/tab-taiwan.module').then( m => m.TabTaiwanPageModule)
  },
  {
    path: 'daily-detail',
    loadChildren: () => import('./daily/daily-detail/daily-detail.module').then( m => m.DailyDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
