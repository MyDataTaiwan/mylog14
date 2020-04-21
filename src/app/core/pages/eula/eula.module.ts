import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EulaPageRoutingModule } from './eula-routing.module';

import { EulaPage } from './eula.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EulaPageRoutingModule,
    TranslateModule,
  ],
  declarations: [EulaPage]
})
export class EulaPageModule {}
