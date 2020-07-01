import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from '../../core/components/main-header/main-header.module';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { SharedLinkPopoverPageModule } from './shared-link-popover/shared-link-popover.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SettingsPageRoutingModule,
    MainHeaderModule,
    SharedLinkPopoverPageModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule { }
