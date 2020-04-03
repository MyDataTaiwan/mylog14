import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { AddRecordPageModule } from './pages/add-record/add-record.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



@NgModule({
  declarations: [
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    MainHeaderModule,
    AddRecordPageModule,
  ],
  exports: [
    SafeUrlPipe,
  ]
})
export class CoreModule { }
