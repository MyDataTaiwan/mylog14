import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareFinishPageRoutingModule } from './share-finish-routing.module';

import { ShareFinishPage } from './share-finish.page';
import { TranslateModule } from '@ngx-translate/core';

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
export class ShareFinishPageModule {}
