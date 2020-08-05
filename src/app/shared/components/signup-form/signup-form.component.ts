import {
  Component, EventEmitter, Input, OnDestroy, OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { combineLatest, from, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

import { RewardService } from '@core/services/reward.service';
import { LoadingService } from '@shared/services/loading.service';

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
      )
      .subscribe(() => {
        this.signupEvent.emit(true);
      });
  }

}
