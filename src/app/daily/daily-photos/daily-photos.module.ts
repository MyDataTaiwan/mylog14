import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyPhotosComponent } from './daily-photos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [DailyPhotosComponent],
  exports: [DailyPhotosComponent],
})
export class DailyPhotosModule { }
