import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecordPageRoutingModule } from './add-record-routing.module';

import { AddRecordPage } from './add-record.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecordPageRoutingModule,
    TranslateModule,
  ],
  declarations: [AddRecordPage],
  entryComponents: [AddRecordPage],
})
export class AddRecordPageModule {}
