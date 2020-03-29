import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabDatePage } from './tab-date.page';
import { DiaryPage } from '../diary/diary.page';
import { StatusCardPage } from '../status-card/status-card.page';
import { ConditionCardPage } from '../condition-card/condition-card.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabDatePage}]),
        TranslateModule
    ],
  declarations: [
    TabDatePage,
    DiaryPage,
    StatusCardPage,
    ConditionCardPage,
  ]
})
export class TabDatePageModule {}
