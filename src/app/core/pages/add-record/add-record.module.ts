import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddRecordPageRoutingModule } from './add-record-routing.module';
import { AddRecordPage } from './add-record.page';
import { CoreModule } from '../../core.module';
import { MainHeaderModule } from '../../components/main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRecordPageRoutingModule,
    TranslateModule,
    MainHeaderModule,
  ],
  declarations: [AddRecordPage],
  entryComponents: [AddRecordPage],
})
export class AddRecordPageModule { }
