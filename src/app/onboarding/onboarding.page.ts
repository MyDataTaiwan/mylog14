import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PrivateCouponService } from '@numbersprotocol/private-coupon';
import { Subject, forkJoin } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DataStoreService } from '../core/services/data-store.service';
import { TranslateConfigService } from '../core/services/translate-config.service';

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

  private readonly destroy$ = new Subject();

  constructor(
    public translateConfigService: TranslateConfigService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly dataStoreService: DataStoreService,
    private readonly privateCouponService: PrivateCouponService
  ) { }

  onSubmit() {
    const userData = this.dataStoreService.getUserData();
    this.confirmButtonEnabled = false;
    userData.email = this.onboardingForm.controls.email.value;
    userData.newUser = false;
    const updateUserData$ = this.dataStoreService.updateUserData(userData);
    const signup$ = this.privateCouponService.signup(userData.email);
    forkJoin([updateUserData$, signup$])
      .subscribe(() => {
        this.router.navigate(['/']);
      }, (error: HttpErrorResponse) => {
        if (error.error.reason === 'USED_EMAIL') {
          this.router.navigate(['/']);
        } else {
          console.error(error);
          this.confirmButtonEnabled = true;
          this.presentToast(error.error.reason || error.statusText);
        }
      });
  }

  private presentToast(message: string) {
    this.toastController.create({
      message,
      duration: 3000
    }).then(toast => toast.present());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
