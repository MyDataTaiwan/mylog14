import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { LanguageService } from '@core/services/language.service';
import { RewardService } from '@core/services/reward.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { TranslateService } from '@ngx-translate/core';
import { UserAuth } from '@numbersprotocol/private-coupon';
import { ToastService } from '@shared/services/toast.service';

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

  language$: Observable<string> = this.langaugeService.get();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly rewardService: RewardService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly translate: TranslateService,
    private readonly dataStore: DataStoreService,
    public readonly langaugeService: LanguageService,
  ) { }

  onSubmit() {
    this.confirmButtonEnabled = false;
    const loading$ = this.showRegisteringUserLoading();
    const signup$ = this.dataStore.updateUserData({ email: this.onboardingForm.controls.email.value })
      .pipe(
        switchMap(() => this.rewardService.signup()),
        catchError((err: HttpErrorResponse) => {
          if (err.error.reason === 'USED_EMAIL') {
            console.log('The API returns USED_EMAIL error.');
            return of(null);
          }
          console.error(err);
          this.confirmButtonEnabled = true;
          this.toastService.showToast(err.error.reason || err.statusText, 3000);
          throw (err);
        }),
        map((userAuth: UserAuth) => ({
          email: this.onboardingForm.controls.email.value,
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
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.loadingElement.dismiss();
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
