import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { LanguageService } from '@core/services/language.service';
import { RewardService } from '@core/services/reward.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { TranslateService } from '@ngx-translate/core';
import { UserAuth } from '@numbersprotocol/private-coupon';

import { RecordPreset } from '../core/services/preset.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnDestroy {

  onboardingForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    agreeTermsAndConditions: [false, Validators.requiredTrue]
  });
  confirmButtonEnabled = true;
  private loadingElement: HTMLIonLoadingElement;

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

  onSubmit() {
    this.confirmButtonEnabled = false;
    const loading$ = this.showRegisteringUserLoading();
    const signup$ = this.rewardService.createUserCredential(this.onboardingForm.controls.email.value)
      .pipe(
        switchMap(userCredential => this.dataStore.updateUserData({
          email: userCredential.email,
          uuid: userCredential.password,
        })),
        switchMap(() => this.rewardService.signup()),
        catchError((err: HttpErrorResponse) => {
          if (err.error.reason === 'USED_EMAIL') {
            console.log('The API returns USED_EMAIL error.');
            return this.rewardService.login();
          }
          this.confirmButtonEnabled = true;
          throw err;
        }),
        map((userAuth: UserAuth) => ({
          newUser: false,
          recordPreset: RecordPreset.COMMON_COLD,
          userId: (userAuth) ? userAuth.userId : null,
        })),
        switchMap(userDataPatch => this.dataStore.updateUserData(userDataPatch)),
      );

    loading$
      .pipe(
        tap(loadingElement => this.loadingElement = loadingElement),
        switchMap(loadingElement => signup$.pipe(map(() => loadingElement))),
        switchMap(loadingElement => loadingElement.dismiss()),
      )
      .subscribe(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      }, err => {
        this.confirmButtonEnabled = true;
        this.loadingElement.dismiss();
        if (err?.error?.reason === 'WRONG_PASSWORD') {
          const errorMessage = this.translate.instant('error.emailUsed');
          throw new Error(errorMessage);
        }
        throw err;
      });
  }

  showRegisteringUserLoading(): Observable<HTMLIonLoadingElement> {
    return this.translate.get('description.registeringUser')
      .pipe(
        switchMap(msg => this.loadingService.showLoading(msg, 10000)),
      );
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
