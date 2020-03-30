import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailPageRoutingModule } from './date-detail-routing.module';

import { DateDetailPage } from './date-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { DateDetailOverviewPage } from '../date-detail-overview/date-detail-overview.page';
import { DateDetailConditionPage } from '../date-detail-condition/date-detail-condition.page';
import { DateDetailPicturePage } from '../date-detail-picture/date-detail-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDetailPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    DateDetailPage,
    DateDetailOverviewPage,
    DateDetailConditionPage,
    DateDetailPicturePage,
  ]
})
export class DateDetailPageModule {}
