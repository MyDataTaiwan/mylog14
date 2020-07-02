import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DailyDetailSymptomsComponent } from './daily-detail-symptoms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [DailyDetailSymptomsComponent],
  exports: [DailyDetailSymptomsComponent],
})
export class DailyDetailSymptomsModule { }
