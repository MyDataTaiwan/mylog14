import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'name-popover',
    loadChildren: () => import('./name-popover/name-popover.module').then(m => m.NamePopoverPageModule)
  },
  {
    path: 'email-popover',
    loadChildren: () => import('./email-popover/email-popover.module').then(m => m.EmailPopoverPageModule)
  },
  {
    path: 'shared-link-popover',
    loadChildren: () => import('./shared-link-popover/shared-link-popover.module').then( m => m.SharedLinkPopoverPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule { }
