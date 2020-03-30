import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymptomDetailPageRoutingModule } from './symptom-detail-routing.module';

import { SymptomDetailPage } from './symptom-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymptomDetailPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SymptomDetailPage]
})
export class SymptomDetailPageModule {}
