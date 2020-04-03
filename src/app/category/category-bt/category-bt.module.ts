import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryBtPageRoutingModule } from './category-bt-routing.module';

import { CategoryBtPage } from './category-bt.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryBtPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CategoryBtPage]
})
export class CategoryBtPageModule {}
