import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LottieModule } from 'ngx-lottie';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddDataHintComponent } from './add-data-hint/add-data-hint.component';
import { AnimationComponent } from './animation/animation.component';
import { OverviewComponent } from './overview.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

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
  declarations: [
    AddDataHintComponent,
    AnimationComponent,
    OverviewComponent,
    SummaryCardsComponent,
  ],
  exports: [OverviewComponent],
})
export class OverviewModule { }
