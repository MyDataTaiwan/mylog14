import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddRecordPage } from '../add-record/add-record.page';
import { AddRecordPageModule } from '../add-record/add-record.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    TabsPage,
    AddRecordPage,
  ],
  entryComponents: [AddRecordPage],
})
export class TabsPageModule {}
