import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewByCategoryPageRoutingModule } from './view-by-category-routing.module';

import { ViewByCategoryPage } from './view-by-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewByCategoryPageRoutingModule
  ],
  declarations: [ViewByCategoryPage]
})
export class ViewByCategoryPageModule {}
