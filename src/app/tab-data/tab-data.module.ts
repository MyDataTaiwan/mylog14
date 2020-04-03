import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabDataPage } from './tab-data.page';
import {TranslateModule} from '@ngx-translate/core';
import { MainHeaderModule } from '../core/components/main-header/main-header.module';
import { DailyOverviewModule } from '../daily/daily-overview/daily-overview.module';
import { CategoryOverviewModule } from '../category/category-overview/category-overview.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabDataPage}]),
        TranslateModule,
        MainHeaderModule,
        DailyOverviewModule,
        CategoryOverviewModule,
    ],
  declarations: [
    TabDataPage,
  ]
})
export class TabDataPageModule {}
