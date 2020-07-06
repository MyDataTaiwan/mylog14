import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DailyPhotosModule } from './daily-photos/daily-photos.module';
import { DailyRecordsModule } from './daily-records/daily-records.module';
import { DailyPageRoutingModule } from './daily-routing.module';
import { DailySummaryModule } from './daily-summary/daily-summary.module';
import { DailyPage } from './daily.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CoreModule,
    DailyPageRoutingModule,
    DailySummaryModule,
    DailyRecordsModule,
    DailyPhotosModule,
  ],
  declarations: [DailyPage]
})
export class DailyPageModule { }
