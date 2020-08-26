import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { EulaEnComponent } from './eula-en/eula-en.component';
import { EulaZhComponent } from './eula-zh/eula-zh.component';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { OnboardingPage } from './onboarding.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    OnboardingPageRoutingModule
  ],
  declarations: [
    EulaEnComponent,
    EulaZhComponent,
    OnboardingPage,
  ]
})
export class OnboardingPageModule { }
