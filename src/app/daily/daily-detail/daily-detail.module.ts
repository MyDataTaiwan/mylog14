import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyDetailPageRoutingModule } from './daily-detail-routing.module';

import { DailyDetailPage } from './daily-detail.page';
import { DailyDetailUpperModule } from './daily-detail-upper/daily-detail-upper.module';
import { DailyDetailSymptomsModule } from './daily-detail-symptoms/daily-detail-symptoms.module';
import { DailyDetailPhotosModule } from './daily-detail-photos/daily-detail-photos.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DailyDetailPageRoutingModule,
    DailyDetailUpperModule,
    DailyDetailSymptomsModule,
    DailyDetailPhotosModule,
  ],
  declarations: [DailyDetailPage]
})
export class DailyDetailPageModule {}
