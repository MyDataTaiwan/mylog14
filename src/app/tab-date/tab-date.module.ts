import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabDatePage } from './tab-date.page';
import {TranslateModule} from '@ngx-translate/core';
import { MainHeaderModule } from '../main-header/main-header.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TabDatePage}]),
        TranslateModule,
        MainHeaderModule,
    ],
  declarations: [
    TabDatePage,
  ]
})
export class TabDatePageModule {}
