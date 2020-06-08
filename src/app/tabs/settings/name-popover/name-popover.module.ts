import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NamePopoverPageRoutingModule } from './name-popover-routing.module';
import { NamePopoverPage } from './name-popover.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    NamePopoverPageRoutingModule
  ],
  declarations: [NamePopoverPage]
})
export class NamePopoverPageModule { }
