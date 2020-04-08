import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyOverviewComponent } from './daily-overview.component';
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  declarations: [DailyOverviewComponent],
  exports: [DailyOverviewComponent],
})
export class DailyOverviewModule {}
