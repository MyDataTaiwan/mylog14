import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { PopoverController } from '@ionic/angular';
import { first, map, tap, switchMap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';

@Component({
  selector: 'app-email-popover',
  templateUrl: './email-popover.page.html',
  styleUrls: ['./email-popover.page.scss'],
})
export class EmailPopoverPage implements OnInit {

  emailForm = this.formBuilder.group({
    email: ['', Validators.email]
  });
  email$ = this.dataStoreService.userData$
    .pipe(
      map(userData => userData.email),
      tap(email => this.emailForm.patchValue({email})),
    );

  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dataStoreService.userData$.pipe(
      first(),
      map(userData => {
        userData.email = this.emailForm.controls.email.value;
        return userData;
      }),
      switchMap(userData => this.dataStoreService.updateUserData(userData)),
      switchMap(_ => this.popoverController.dismiss()),
    ).subscribe();
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
