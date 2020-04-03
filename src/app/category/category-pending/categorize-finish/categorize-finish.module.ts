import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorizeFinishPageRoutingModule } from './categorize-finish-routing.module';

import { CategorizeFinishPage } from './categorize-finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorizeFinishPageRoutingModule
  ],
  declarations: [CategorizeFinishPage]
})
export class CategorizeFinishPageModule {}
