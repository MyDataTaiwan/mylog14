import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { ClickOutsideSameClassDirective } from './directives/click-outside-same-class.directive';
import { AddRecordPageModule } from './pages/add-record/add-record.module';
import { ShareFinishPageModule } from './pages/share-finish/share-finish.module';
import { SharePageModule } from './pages/share/share.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';



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
    SharePageModule,
    ShareFinishPageModule,
  ],
  exports: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
  ]
})
export class CoreModule { }
