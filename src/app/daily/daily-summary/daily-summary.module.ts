import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DailySummaryComponent } from './daily-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
  ],
  declarations: [DailySummaryComponent],
  exports: [DailySummaryComponent],
})
export class DailySummaryModule { }
