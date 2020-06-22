import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { DataStoreService } from '../core/services/data-store.service';
import { TranslateConfigService } from '../core/services/translate-config.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnDestroy {

  private readonly destroy$ = new Subject();

  onboardingForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    agreeTermsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(
    public translateConfigService: TranslateConfigService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dataStoreService: DataStoreService
  ) { }

  onSubmit() {
    const userData = this.dataStoreService.getUserData();
    userData.email = this.onboardingForm.controls.email.value;
    userData.newUser = false;
    this.dataStoreService.updateUserData(userData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
