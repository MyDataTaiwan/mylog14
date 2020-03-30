import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecordPageRoutingModule } from './add-record-routing.module';

import { AddRecordPage } from './add-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecordPageRoutingModule
  ],
  declarations: [AddRecordPage],
})
export class AddRecordPageModule {}
