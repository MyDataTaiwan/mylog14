import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorizeImgPopoverPageRoutingModule } from './categorize-img-popover-routing.module';

import { CategorizeImgPopoverPage } from './categorize-img-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorizeImgPopoverPageRoutingModule
  ],
  declarations: [CategorizeImgPopoverPage]
})
export class CategorizeImgPopoverPageModule {}
