import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyDetailUpperComponent } from './daily-detail-upper.component';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
  ],
  declarations: [DailyDetailUpperComponent],
  exports: [DailyDetailUpperComponent],
})
export class DailyDetailUpperModule {}
