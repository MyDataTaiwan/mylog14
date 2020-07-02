import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLinkPopoverPageRoutingModule } from './shared-link-popover-routing.module';
import { SharedLinkPopoverPage } from './shared-link-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedLinkPopoverPageRoutingModule,
    TranslateModule
  ],
  declarations: [SharedLinkPopoverPage]
})
export class SharedLinkPopoverPageModule { }
