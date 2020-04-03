import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CategoryOverviewComponent } from './category-overview.component';



@NgModule({
  declarations: [
    CategoryOverviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    CategoryOverviewComponent,
  ]
})
export class CategoryOverviewModule { }
