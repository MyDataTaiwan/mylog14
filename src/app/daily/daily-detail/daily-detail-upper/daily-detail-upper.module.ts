import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyDetailUpperComponent } from './daily-detail-upper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [DailyDetailUpperComponent],
  exports: [DailyDetailUpperComponent],
})
export class DailyDetailUpperModule {}
