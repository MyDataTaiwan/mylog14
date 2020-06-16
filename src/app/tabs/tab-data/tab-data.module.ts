import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from '../../core/components/main-header/main-header.module';
import { DailyOverviewModule } from '../../daily/daily-overview/daily-overview.module';
import { TabDataPage } from './tab-data.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabDataPage }]),
    TranslateModule,
    MainHeaderModule,
    DailyOverviewModule,
  ],
  declarations: [
    TabDataPage,
  ]
})
export class TabDataPageModule { }
