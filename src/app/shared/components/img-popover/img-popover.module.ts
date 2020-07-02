import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../../../core/core.module';
import { ImgPopoverPage } from './img-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
  ],
  declarations: [ImgPopoverPage],
  entryComponents: [ImgPopoverPage],
})
export class ImgPopoverPageModule { }
