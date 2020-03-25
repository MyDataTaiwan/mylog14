import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusCardPageRoutingModule } from './status-card-routing.module';

import { StatusCardPage } from './status-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusCardPageRoutingModule
  ],
  declarations: [StatusCardPage]
})
export class StatusCardPageModule {}
