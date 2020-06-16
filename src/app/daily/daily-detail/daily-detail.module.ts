import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DailyDetailPhotosModule } from './daily-detail-photos/daily-detail-photos.module';
import { DailyDetailPageRoutingModule } from './daily-detail-routing.module';
import { DailyDetailSymptomsModule } from './daily-detail-symptoms/daily-detail-symptoms.module';
import { DailyDetailUpperModule } from './daily-detail-upper/daily-detail-upper.module';
import { DailyDetailPage } from './daily-detail.page';

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
export class DailyDetailPageModule { }
