import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { OnboardingPage } from './onboarding.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    OnboardingPageRoutingModule
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule { }
