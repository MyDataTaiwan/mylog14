import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorizeDataPageRoutingModule } from './categorize-data-routing.module';

import { CategorizeDataPage } from './categorize-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorizeDataPageRoutingModule
  ],
  declarations: [CategorizeDataPage]
})
export class CategorizeDataPageModule {}
