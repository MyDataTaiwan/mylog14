import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  FormlyFieldInputComponent,
} from '@core/forms/formly-field-input/formly-field-input-component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import {
  AddRecordComponent,
} from './components/add-record/add-record.component';
import {
  IonCenterItemComponent,
} from './components/ion-center-item/ion-center-item.component';
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
  ResetEmailComponent,
} from './components/reset-email/reset-email.component';
import { RewardComponent } from './components/reward/reward.component';
import {
  SignupFormComponent,
} from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [
    AddPhotoComponent,
    AddRecordComponent,
    IonCenterItemComponent,
    MapComponent,
    PhotoViewerComponent,
    PopoverComponent,
    ProofItemComponent,
    RewardComponent,
    ResetEmailComponent,
    QrScannerComponent,
    SignupFormComponent,
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
    IonCenterItemComponent,
    MapComponent,
    PhotoViewerComponent,
    PopoverComponent,
    ProofItemComponent,
    RewardComponent,
    ResetEmailComponent,
    QrScannerComponent,
    SignupFormComponent,
  ],
  providers: [BarcodeScanner],
})
export class SharedModule { }
