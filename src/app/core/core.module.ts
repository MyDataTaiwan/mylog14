import { AddRecordComponentModule } from './components/add-record/add-record.module';
import { ClickOutsideSameClassDirective } from './directives/click-outside-same-class.directive';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainHeaderModule } from './components/main-header/main-header.module';
import { NgModule } from '@angular/core';
import { PopoverComponent } from './components/popover/popover.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SharePageModule } from './pages/share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { ShopScannerComponent } from './components/shop-scanner/shop-scanner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { FormlyModule } from '@ngx-formly/core';



@NgModule({
  entryComponents: [
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ],
  declarations: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    MainHeaderModule,
    AddRecordComponentModule,
    SharePageModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyIonicModule,
  ],
  exports: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ]
})
export class CoreModule { }
