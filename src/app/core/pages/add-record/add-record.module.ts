import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddRecordPageRoutingModule } from './add-record-routing.module';
import { AddRecordPage } from './add-record.page';

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
export class AddRecordPageModule { }
