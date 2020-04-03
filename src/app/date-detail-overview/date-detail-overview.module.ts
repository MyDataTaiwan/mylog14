import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailOverviewComponent } from './date-detail-overview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [DateDetailOverviewComponent],
  exports: [DateDetailOverviewComponent],
})
export class DateDetailOverviewComponentModule {}
