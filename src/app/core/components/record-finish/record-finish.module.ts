import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordFinishPageRoutingModule } from './record-finish-routing.module';

import { RecordFinishPage } from './record-finish.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordFinishPageRoutingModule,
    TranslateModule,
  ],
  declarations: [RecordFinishPage]
})
export class RecordFinishPageModule {}
