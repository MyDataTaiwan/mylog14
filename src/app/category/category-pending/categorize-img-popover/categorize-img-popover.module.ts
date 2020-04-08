import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorizeImgPopoverPageRoutingModule } from './categorize-img-popover-routing.module';

import { CategorizeImgPopoverPage } from './categorize-img-popover.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorizeImgPopoverPageRoutingModule,
    CoreModule,
  ],
  declarations: [CategorizeImgPopoverPage],
  entryComponents: [CategorizeImgPopoverPage],
})
export class CategorizeImgPopoverPageModule {}
