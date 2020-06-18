import { AddRecordPageModule } from './pages/add-record/add-record.module';
import { ClickOutsideSameClassDirective } from './directives/click-outside-same-class.directive';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { NgModule } from '@angular/core';
import { PopoverComponent } from './components/popover/popover.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ShareFinishPageModule } from './pages/share-finish/share-finish.module';
import { SharePageModule } from './pages/share/share.module';
import { TranslateModule } from '@ngx-translate/core';



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
