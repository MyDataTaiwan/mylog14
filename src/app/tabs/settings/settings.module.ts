import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from '../../core/components/main-header/main-header.module';
import { NamePopoverPageModule } from "./name-popover/name-popover.module";
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SettingsPageRoutingModule,
    MainHeaderModule,
    NamePopoverPageModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule { }
