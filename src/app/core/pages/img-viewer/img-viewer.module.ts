import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgViewerPageRoutingModule } from './img-viewer-routing.module';

import { ImgViewerPage } from './img-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgViewerPageRoutingModule
  ],
  declarations: [ImgViewerPage]
})
export class ImgViewerPageModule {}
