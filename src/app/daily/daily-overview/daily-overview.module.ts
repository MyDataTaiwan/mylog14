import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
import { DailyOverviewComponent } from './daily-overview.component';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  declarations: [DailyOverviewComponent],
  exports: [DailyOverviewComponent],
})
export class DailyOverviewModule { }
