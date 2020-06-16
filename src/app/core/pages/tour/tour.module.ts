import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TourPageRoutingModule } from './tour-routing.module';
import { TourPage } from './tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourPageRoutingModule,
    TranslateModule,
  ],
  declarations: [TourPage]
})
export class TourPageModule { }
