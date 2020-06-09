import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-record',
    loadChildren: () => import('./core/pages/add-record/add-record.module').then(m => m.AddRecordPageModule)
  },
  {
    path: 'record-finish',
    loadChildren: () => import('./core/components/record-finish/record-finish.module').then(m => m.RecordFinishPageModule)
  },
  {
    path: 'img-popover',
    loadChildren: () => import('./core/pages/img-popover/img-popover.module').then(m => m.ImgPopoverPageModule)
  },
  {
    path: 'tour',
    loadChildren: () => import('./core/pages/tour/tour.module').then(m => m.TourPageModule)
  },
  {
    path: 'eula',
    loadChildren: () => import('./core/pages/eula/eula.module').then(m => m.EulaPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./core/pages/share/share.module').then(m => m.SharePageModule)
  },
  {
    path: 'share-finish',
    loadChildren: () => import('./core/pages/share-finish/share-finish.module').then(m => m.ShareFinishPageModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./core/pages/guide/guide.module').then(m => m.GuidePageModule)
  },
  {
    path: 'img-viewer',
    loadChildren: () => import('./core/pages/img-viewer/img-viewer.module').then(m => m.ImgViewerPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
