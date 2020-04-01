import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailPageRoutingModule } from './date-detail-routing.module';

import { DateDetailPage } from './date-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { DateDetailOverviewPageModule } from '../date-detail-overview/date-detail-overview.module';
import { DateDetailConditionPageModule } from '../date-detail-condition/date-detail-condition.module';
import { DateDetailPicturePageModule } from '../date-detail-picture/date-detail-picture.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDetailPageRoutingModule,
    TranslateModule,
    DateDetailOverviewPageModule,
    DateDetailConditionPageModule,
    DateDetailPicturePageModule,
  ],
  declarations: [
    DateDetailPage,
  ]
})
export class DateDetailPageModule {}
