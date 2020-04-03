import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailPictureComponent } from './date-detail-picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [DateDetailPictureComponent],
  exports: [DateDetailPictureComponent],
})
export class DateDetailPictureComponentModule {}
