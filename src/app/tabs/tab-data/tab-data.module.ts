import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { OverviewModule } from '../../overview/overview.module';
import { TabDataPage } from './tab-data.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabDataPage }]),
    TranslateModule,
    CoreModule,
    OverviewModule,
  ],
  declarations: [
    TabDataPage,
  ]
})
export class TabDataPageModule { }
