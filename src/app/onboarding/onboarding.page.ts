import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LanguageService } from '@core/services/language.service';
import { RewardService } from '@core/services/reward.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { TranslateService } from '@ngx-translate/core';

import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnDestroy {

  signupForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    agreeTermsAndConditions: [false, Validators.requiredTrue]
  });
  confirmButtonEnabled = true;

  private readonly destroy$ = new Subject();

  language$: Observable<string> = this.languageService.language$;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly rewardService: RewardService,
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly dataStore: DataStoreService,
    public readonly languageService: LanguageService,
  ) { }

  onSignup() {
    this.dataStore.updateUserData({ newUser: false })
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.router.navigate(['/'], { replaceUrl: true }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export interface SignupResponse {
  status: string;
  response: {
    expires: number;
    token: string;
    user_id: string;
  };
}
