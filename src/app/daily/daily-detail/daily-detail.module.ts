import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyDetailPageRoutingModule } from './daily-detail-routing.module';

import { DailyDetailPage } from './daily-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyDetailPageRoutingModule
  ],
  declarations: [DailyDetailPage]
})
export class DailyDetailPageModule {}
