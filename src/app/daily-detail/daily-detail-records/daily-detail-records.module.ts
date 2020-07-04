import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DailyDetailRecordsComponent } from './daily-detail-records.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [DailyDetailRecordsComponent],
  exports: [DailyDetailRecordsComponent],
})
export class DailyDetailRecordsModule { }
