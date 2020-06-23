import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { PopoverController, LoadingController } from '@ionic/angular';
import { first, map, switchMap, tap, catchError } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Observable, defer, from, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PrivateCouponService } from '@numbersprotocol/private-coupon';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-popover',
  templateUrl: './email-popover.page.html',
  styleUrls: ['./email-popover.page.scss'],
})
export class EmailPopoverPage implements OnInit {

  private loadingElement: HTMLIonLoadingElement;
  emailForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  });
  email$ = this.dataStoreService.userData$
    .pipe(
      map(userData => userData.email),
      tap(email => this.emailForm.patchValue({ email })),
    );

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly formBuilder: FormBuilder,
    private readonly loadingCtrl: LoadingController,
    private readonly popoverController: PopoverController,
    private readonly privateCouponService: PrivateCouponService,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const loading$ = this.presentLoading();
    const signup$ = this.privateCouponService.signup(this.emailForm.controls.email.value)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.reason === 'USED_EMAIL') {
            console.log('The API returns USED_EMAIL error.');
            return of(null);
          }
          console.error(err);
          throw (err);
        }),
        switchMap((res: SignupResponse) => {
          const userData = this.dataStoreService.getUserData();
          userData.email = this.emailForm.controls.email.value;
          userData.newUser = false;
          if (res) {
            userData.userId = res.response.user_id;
          }
          return this.dataStoreService.updateUserData(userData);
        }),
      );

    loading$
      .pipe(
        tap(loadingElement => this.loadingElement = loadingElement),
        switchMap(loadingElement => signup$.pipe(map(() => loadingElement))),
        switchMap(loadingElement => loadingElement.dismiss()),
      )
      .subscribe(() => {
        this.popoverController.dismiss();
      }, () => {
        this.loadingElement.dismiss();
      });
  }

  onCancel() {
    this.popoverController.dismiss();
  }

  private presentLoading(): Observable<HTMLIonLoadingElement> {
    return this.translate.get('description.registeringUser')
      .pipe(
        switchMap(msg => {
          return defer(() => this.loadingCtrl.create({
            message: msg,
            duration: 10000,
          }));
        }),
        switchMap(loading => from(loading.present())
          .pipe(
            map(() => loading),
          )),
      );
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
