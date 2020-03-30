import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailOverviewPageRoutingModule } from './date-detail-overview-routing.module';

import { DateDetailOverviewPage } from './date-detail-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDetailOverviewPageRoutingModule
  ],
  declarations: [DateDetailOverviewPage]
})
export class DateDetailOverviewPageModule {}
