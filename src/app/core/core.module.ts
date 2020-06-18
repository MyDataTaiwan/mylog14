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
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { ShopScannerComponent } from './components/shop-scanner/shop-scanner.component';



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
    AddRecordPageModule,
    SharePageModule,
    ShareFinishPageModule,
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
