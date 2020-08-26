import {
  Component, EventEmitter, Input, OnDestroy, OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
  combineLatest, from, Observable, of, Subject,
  throwError,
} from 'rxjs';
import {
  catchError, filter, map, switchMap, takeUntil,
  tap,
} from 'rxjs/operators';

import { RewardService } from '@core/services/reward.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '@shared/services/loading.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() hideTermsAndConditions?: boolean;
  @Output() signupEvent = new EventEmitter<boolean>();

  formConfig = {
    email: ['', [Validators.email, Validators.required]],
  };
  signupForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    agreeTermsAndConditions: [false, Validators.requiredTrue],
  });
  confirmButtonEnabled = true;
  destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly rewardService: RewardService,
    private readonly toastService: ToastService,
    private readonly translateService: TranslateService,
  ) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.confirmButtonEnabled = false;
    combineLatest([
      this.rewardService.signup(this.signupForm.controls.email.value)
        .pipe(
          catchError(err => of(err)),
        ),
      this.loadingService.showLoading('description.registeringUser'),
    ])
      .pipe(
        switchMap(([res, loading]) => from(loading.dismiss())
          .pipe(
            tap(() => this.confirmButtonEnabled = true),
            switchMap(() => (res instanceof Error) ? throwError(res) : of(res)),
            takeUntil(this.destroy$),
          )),
        switchMap(() => this.testLogin()),
        filter(loginPassed => loginPassed),
      )
      .subscribe(() => {
        this.signupEvent.emit(true);
      });
  }

  private testLogin(): Observable<boolean> {
    return this.rewardService.login()
      .pipe(
        switchMap(userAuth => {
          if (userAuth.userId === 'non_authenticated_user_mylog14coupon_test') {
            const message = this.translateService.instant('description.emailVerification');
            return this.toastService.showToast(message, 'secondary')
              .pipe(
                map(() => false),
              );
          } else {
            return of(true);
          }
        }),
      );
  }

}
