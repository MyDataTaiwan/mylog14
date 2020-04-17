import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordFinishPageRoutingModule } from './record-finish-routing.module';

import { RecordFinishPage } from './record-finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordFinishPageRoutingModule
  ],
  declarations: [RecordFinishPage]
})
export class RecordFinishPageModule {}
