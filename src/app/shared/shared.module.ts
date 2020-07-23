import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  FormlyFieldInputComponent,
} from '@core/forms/formly-field-input/formly-field-input-component';
import { IonicModule } from '@ionic/angular';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import {
  AddRecordComponent,
} from './components/add-record/add-record.component';
import { MapComponent } from './components/map/map.component';
import {
  PhotoViewerComponent,
} from './components/photo-viewer/photo-viewer.component';
import { PopoverComponent } from './components/popover/popover.component';
import {
  ProofItemComponent,
} from './components/proof-item/proof-item.component';
import {
  QrScannerComponent,
} from './components/qr-scanner/qr-scanner.component';
import {
  ShopScannerComponent,
} from './components/shop-scanner/shop-scanner.component';

@NgModule({
  declarations: [
    AddPhotoComponent,
    AddRecordComponent,
    MapComponent,
    PhotoViewerComponent,
    PopoverComponent,
    ProofItemComponent,
    ShopScannerComponent,
    QrScannerComponent,
    FormlyFieldInputComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'customInput', component: FormlyFieldInputComponent },
      ],
    }),
    FormlyIonicModule,
    LeafletModule,
  ],
  exports: [
    AddPhotoComponent,
    AddRecordComponent,
    MapComponent,
    PhotoViewerComponent,
    PopoverComponent,
    ProofItemComponent,
    ShopScannerComponent,
    QrScannerComponent,
  ]
})
export class SharedModule { }
