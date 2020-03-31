import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabTaiwanPageRoutingModule } from './tab-taiwan-routing.module';

import { TabTaiwanPage } from './tab-taiwan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabTaiwanPageRoutingModule
  ],
  declarations: [TabTaiwanPage]
})
export class TabTaiwanPageModule {}
