import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmailPopoverPageRoutingModule } from './email-popover-routing.module';
import { EmailPopoverPage } from './email-popover.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    EmailPopoverPageRoutingModule
  ],
  declarations: [EmailPopoverPage]
})
export class EmailPopoverPageModule { }
