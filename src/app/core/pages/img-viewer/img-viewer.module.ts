import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ImgViewerPageRoutingModule } from './img-viewer-routing.module';
import { ImgViewerPage } from './img-viewer.page';

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
export class ImgViewerPageModule { }
