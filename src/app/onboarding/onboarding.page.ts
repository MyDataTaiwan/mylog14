import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataStoreService } from '../core/services/data-store.service';
import { TranslateConfigService } from '../core/services/translate-config.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnDestroy {

  private destroy$ = new Subject();

  onboardingForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    agreeTermsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(
    public translateConfigService: TranslateConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataStoreService: DataStoreService
  ) { }

  onSubmit() {
    this.dataStoreService.updateUserData({
      firstName: '',
      lastName: '',
      newUser: false,
      email: this.onboardingForm.controls.email.value,
      eulaAccepted: this.onboardingForm.controls.agreeTermsAndConditions.value,
      guideAccepted: true
    }).pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
