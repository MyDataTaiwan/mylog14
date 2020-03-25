import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConditionCardPageRoutingModule } from './condition-card-routing.module';

import { ConditionCardPage } from './condition-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConditionCardPageRoutingModule
  ],
  declarations: [ConditionCardPage]
})
export class ConditionCardPageModule {}
