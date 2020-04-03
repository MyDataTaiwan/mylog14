import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDetailConditionComponent } from './date-detail-condition.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [DateDetailConditionComponent],
  exports: [DateDetailConditionComponent],
})
export class DateDetailConditionComponentModule {}
