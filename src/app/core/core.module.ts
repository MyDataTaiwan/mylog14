import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { AddRecordPageModule } from './pages/add-record/add-record.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { EulaPageModule } from './pages/eula/eula.module';
import { ClickOutsideSameClassDirective } from './directives/click-outside-same-class.directive';
import { SharePageModule } from './pages/share/share.module';
import { ShareFinishPageModule } from './pages/share-finish/share-finish.module';
import { PopoverComponent } from './components/popover/popover.component';



@NgModule({
  entryComponents: [
    PopoverComponent,
  ],
  declarations: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
    PopoverComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    MainHeaderModule,
    AddRecordPageModule,
    EulaPageModule,
    SharePageModule,
    ShareFinishPageModule,
  ],
  exports: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
    PopoverComponent,
  ]
})
export class CoreModule { }
