import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'diary',
    loadChildren: () => import('./diary/diary.module').then( m => m.DiaryPageModule)
  },
  {
    path: 'status-card',
    loadChildren: () => import('./status-card/status-card.module').then( m => m.StatusCardPageModule)
  },
  {
    path: 'condition-card',
    loadChildren: () => import('./condition-card/condition-card.module').then( m => m.ConditionCardPageModule)
  },
  {
    path: 'view-by-date',
    loadChildren: () => import('./view-by-date/view-by-date.module').then( m => m.ViewByDatePageModule)
  },
  {
    path: 'date-detail',
    loadChildren: () => import('./date-detail/date-detail.module').then( m => m.DateDetailPageModule)
  },
  {
    path: 'date-detail-overview',
    loadChildren: () => import('./date-detail-overview/date-detail-overview.module').then( m => m.DateDetailOverviewPageModule)
  },
  {
    path: 'date-detail-condition',
    loadChildren: () => import('./date-detail-condition/date-detail-condition.module').then( m => m.DateDetailConditionPageModule)
  },
  {
    path: 'date-detail-picture',
    loadChildren: () => import('./date-detail-picture/date-detail-picture.module').then( m => m.DateDetailPicturePageModule)
  },
  {
    path: 'view-by-category',
    loadChildren: () => import('./view-by-category/view-by-category.module').then( m => m.ViewByCategoryPageModule)
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
