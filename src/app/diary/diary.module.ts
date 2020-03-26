import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryPageRoutingModule } from './diary-routing.module';

import { DiaryPage } from './diary.page';
import { StatusCardPage } from '../status-card/status-card.page';
import { ConditionCardPage } from '../condition-card/condition-card.page';
import { StatusCardPageModule } from '../status-card/status-card.module';
import { ConditionCardPageModule } from '../condition-card/condition-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryPageRoutingModule,
  ],
  declarations: [
    DiaryPage,
    StatusCardPage,
    ConditionCardPage,
  ]
})
export class DiaryPageModule {}
