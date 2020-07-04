import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DailyDetailPhotosComponent } from './daily-detail-photos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [DailyDetailPhotosComponent],
  exports: [DailyDetailPhotosComponent],
})
export class DailyDetailPhotosModule { }
