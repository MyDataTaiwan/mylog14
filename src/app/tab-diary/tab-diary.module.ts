import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabDiaryPage } from './tab-diary.page';
import { DiaryPage } from '../diary/diary.page';
import { StatusCardPage } from '../status-card/status-card.page';
import { ConditionCardPage } from '../condition-card/condition-card.page';
import { DiaryPageModule } from '../diary/diary.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabDiaryPage }]),
  ],
  declarations: [
    TabDiaryPage,
    DiaryPage,
  ]
})
export class TabDiaryPageModule {}
