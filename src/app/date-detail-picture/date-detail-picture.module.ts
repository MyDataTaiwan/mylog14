import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailPicturePageRoutingModule } from './date-detail-picture-routing.module';

import { DateDetailPicturePage } from './date-detail-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDetailPicturePageRoutingModule
  ],
  declarations: [DateDetailPicturePage]
})
export class DateDetailPicturePageModule {}
