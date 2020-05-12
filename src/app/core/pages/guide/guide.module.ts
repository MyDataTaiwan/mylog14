import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuidePageRoutingModule } from './guide-routing.module';

import { GuidePage } from './guide.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuidePageRoutingModule,
    TranslateModule
  ],
  declarations: [GuidePage]
})
export class GuidePageModule {}
