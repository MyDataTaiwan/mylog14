import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyOverviewComponent } from './daily-overview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  declarations: [DailyOverviewComponent],
  exports: [DailyOverviewComponent],
})
export class DailyOverviewModule {}
