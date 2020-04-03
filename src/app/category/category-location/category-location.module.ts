import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryLocationPageRoutingModule } from './category-location-routing.module';

import { CategoryLocationPage } from './category-location.page';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryLocationPageRoutingModule,
    TranslateModule,
    CoreModule,
  ],
  declarations: [CategoryLocationPage]
})
export class CategoryLocationPageModule {}
