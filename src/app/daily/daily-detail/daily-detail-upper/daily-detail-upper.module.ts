import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { DailyDetailUpperComponent } from './daily-detail-upper.component';

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
export class DailyDetailUpperModule { }
