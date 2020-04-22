import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgPopoverPageRoutingModule } from './img-popover-routing.module';

import { ImgPopoverPage } from './img-popover.page';
import { CoreModule } from '../../core.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgPopoverPageRoutingModule,
    CoreModule,
    TranslateModule,
  ],
  declarations: [ImgPopoverPage],
  entryComponents: [ImgPopoverPage],
})
export class ImgPopoverPageModule {}
