import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { SharedLinkPopoverPageModule } from './shared-link-popover/shared-link-popover.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    SettingsPageRoutingModule,
    CoreModule,
    SharedLinkPopoverPageModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule { }
