import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtDetailPageRoutingModule } from './bt-detail-routing.module';

import { BtDetailPage } from './bt-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtDetailPageRoutingModule,
    TranslateModule,
  ],
  declarations: [BtDetailPage]
})
export class BtDetailPageModule {}
