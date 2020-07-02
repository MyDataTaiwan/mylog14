import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  FormlyFieldInputComponent,
} from '@core/forms/formly-field-input/formly-field-input-component';
import { IonicModule } from '@ionic/angular';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { PopoverComponent } from './components/popover/popover.component';
import {
  QrScannerComponent,
} from './components/qr-scanner/qr-scanner.component';
import {
  ShopScannerComponent,
} from './components/shop-scanner/shop-scanner.component';

@NgModule({
  entryComponents: [
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ],
  declarations: [
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
    FormlyFieldInputComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'customInput', component: FormlyFieldInputComponent },
      ],
    }),
    FormlyIonicModule,
  ],
  exports: [
    PopoverComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ]
})
export class SharedModule { }
