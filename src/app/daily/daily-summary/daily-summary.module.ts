import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { DailySummaryComponent } from './daily-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [DailySummaryComponent],
  exports: [DailySummaryComponent],
})
export class DailySummaryModule { }
