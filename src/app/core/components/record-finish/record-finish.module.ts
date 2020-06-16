import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RecordFinishPageRoutingModule } from './record-finish-routing.module';
import { RecordFinishPage } from './record-finish.page';

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
export class RecordFinishPageModule { }
