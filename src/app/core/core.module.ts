import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { AddRecordPageModule } from './pages/add-record/add-record.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { EulaPageModule } from './pages/eula/eula.module';
import { ClickOutsideSameClassDirective } from './directives/click-outside-same-class.directive';



@NgModule({
  declarations: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    MainHeaderModule,
    AddRecordPageModule,
    EulaPageModule,
  ],
  exports: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
  ]
})
export class CoreModule { }
