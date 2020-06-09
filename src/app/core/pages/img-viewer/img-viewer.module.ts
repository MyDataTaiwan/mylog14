import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgViewerPageRoutingModule } from './img-viewer-routing.module';

import { ImgViewerPage } from './img-viewer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgViewerPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ImgViewerPage]
})
export class ImgViewerPageModule {}
