import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddRecordComponent } from './add-record.component';
import { CoreModule } from '../../core.module';
import { MainHeaderModule } from '../../components/main-header/main-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MainHeaderModule,
  ],
  declarations: [AddRecordComponent],
  entryComponents: [AddRecordComponent],
})
export class AddRecordComponentModule { }
