import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabTaiwanPageRoutingModule } from './tab-taiwan-routing.module';

import { TabTaiwanPage } from './tab-taiwan.page';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
	return import('lottie-web');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabTaiwanPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [TabTaiwanPage]
})
export class TabTaiwanPageModule {}
