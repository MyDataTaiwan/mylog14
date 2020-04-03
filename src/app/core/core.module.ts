import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { AddRecordPageModule } from './pages/add-record/add-record.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    MainHeaderModule,
    AddRecordPageModule,
  ]
})
export class CoreModule { }
