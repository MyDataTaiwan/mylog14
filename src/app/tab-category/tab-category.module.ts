import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabCategoryPage } from './tab-category.page';
import { TranslateModule } from '@ngx-translate/core';
import { ViewByCategoryPageModule } from '../view-by-category/view-by-category.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabCategoryPage }]),
    TranslateModule,
    ViewByCategoryPageModule,
  ],
  declarations: [
    TabCategoryPage,
  ]
})
export class TabCategoryPageModule {}
