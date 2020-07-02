import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GuidePageRoutingModule } from './guide-routing.module';
import { GuidePage } from './guide.page';

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
export class GuidePageModule { }
