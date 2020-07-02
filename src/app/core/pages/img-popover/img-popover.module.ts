import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../../core.module';
import { ImgPopoverPageRoutingModule } from './img-popover-routing.module';
import { ImgPopoverPage } from './img-popover.page';

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
export class ImgPopoverPageModule { }
