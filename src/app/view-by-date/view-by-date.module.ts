import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewByDatePageRoutingModule } from './view-by-date-routing.module';

import { ViewByDatePage } from './view-by-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewByDatePageRoutingModule
  ],
  declarations: [ViewByDatePage]
})
export class ViewByDatePageModule {}
