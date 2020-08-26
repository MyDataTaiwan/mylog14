import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SharePageRoutingModule } from './share-routing.module';
import { SharePage } from './share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePageRoutingModule,
    CoreModule,
    TranslateModule,
  ],
  declarations: [SharePage]
})
export class SharePageModule { }
