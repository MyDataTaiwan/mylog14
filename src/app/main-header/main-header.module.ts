import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainHeaderComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    MainHeaderComponent,
  ]
})
export class MainHeaderModule { }
