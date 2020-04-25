import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabTaiwanDetailsPageRoutingModule } from './tab-taiwan-details-routing.module';

import { TabTaiwanDetailsPage } from './tab-taiwan-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabTaiwanDetailsPageRoutingModule
  ],
  declarations: [TabTaiwanDetailsPage]
})
export class TabTaiwanDetailsPageModule {}
