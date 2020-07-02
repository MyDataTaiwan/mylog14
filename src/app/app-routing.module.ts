import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'img-popover',
    loadChildren: () => import('./core/pages/img-popover/img-popover.module').then(m => m.ImgPopoverPageModule)
  },
  {
    path: 'share',
    loadChildren: () => import('./core/pages/share/share.module').then(m => m.SharePageModule)
  },
  {
    path: 'img-viewer',
    loadChildren: () => import('./core/pages/img-viewer/img-viewer.module').then(m => m.ImgViewerPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
