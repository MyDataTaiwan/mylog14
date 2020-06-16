import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShareFinishPageRoutingModule } from './share-finish-routing.module';
import { ShareFinishPage } from './share-finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareFinishPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ShareFinishPage],
  entryComponents: [ShareFinishPage],
})
export class ShareFinishPageModule { }
