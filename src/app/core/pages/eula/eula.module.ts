import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EulaPageRoutingModule } from './eula-routing.module';
import { EulaPage } from './eula.page';

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
export class EulaPageModule { }
