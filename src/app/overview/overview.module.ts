import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LottieModule } from 'ngx-lottie';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AnimationComponent } from './animation/animation.component';
import { OverviewComponent } from './overview.component';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  entryComponents: [
    AnimationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  declarations: [
    AnimationComponent,
    OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule { }
