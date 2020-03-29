import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailPageRoutingModule } from './date-detail-routing.module';

import { DateDetailPage } from './date-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDetailPageRoutingModule
  ],
  declarations: [DateDetailPage]
})
export class DateDetailPageModule {}
