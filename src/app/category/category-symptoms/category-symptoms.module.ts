import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySymptomsPageRoutingModule } from './category-symptoms-routing.module';

import { CategorySymptomsPage } from './category-symptoms.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySymptomsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CategorySymptomsPage]
})
export class CategorySymptomsPageModule {}
