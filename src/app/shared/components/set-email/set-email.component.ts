import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { defer, Observable } from 'rxjs';
import {
  catchError, map, repeat, switchMap, take,
  tap,
} from 'rxjs/operators';

import { RewardService } from '@core/services/reward.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserAuth } from '@numbersprotocol/private-coupon';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-set-email',
  templateUrl: './set-email.component.html',
  styleUrls: ['./set-email.component.scss'],
})
export class SetEmailComponent implements OnInit {
  onboardingForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    agreeTermsAndConditions: [false, Validators.requiredTrue]
  });
  confirmButtonEnabled = true;
  private loadingElement: HTMLIonLoadingElement;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly formBuilder: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly modalCtrl: ModalController,
    private readonly rewardService: RewardService,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit() { }

  cancel() {
    defer(() => this.modalCtrl.dismiss())
      .pipe(
        repeat(2),
        take(2),
      ).subscribe();
  }

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
        map((userAuth: UserAuth) => ({ userId: userAuth?.userId })),
        switchMap(userDataPatch => this.dataStore.updateUserData(userDataPatch)),
      );

    loading$
      .pipe(
        tap(loadingElement => this.loadingElement = loadingElement),
        switchMap(loadingElement => signup$.pipe(map(() => loadingElement))),
        switchMap(loadingElement => loadingElement.dismiss()),
      )
      .subscribe(() => {
        this.modalCtrl.dismiss({ email_updated: true });
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

}
