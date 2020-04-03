import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPendingPageRoutingModule } from './category-pending-routing.module';

import { CategoryPendingPage } from './category-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPendingPageRoutingModule
  ],
  declarations: [CategoryPendingPage]
})
export class CategoryPendingPageModule {}
