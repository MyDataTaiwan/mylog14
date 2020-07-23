import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import {
  ClickOutsideSameClassDirective,
} from './directives/click-outside-same-class.directive';
import { HeaderComponent } from './header/header.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    SafeUrlPipe,
    ClickOutsideSameClassDirective,
    HeaderComponent,
  ]
})
export class CoreModule { }
