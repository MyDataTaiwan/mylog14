import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { PopoverController } from '@ionic/angular';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';

@Component({
  selector: 'app-email-popover',
  templateUrl: './email-popover.page.html',
  styleUrls: ['./email-popover.page.scss'],
})
export class EmailPopoverPage implements OnInit {

  emailForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  });
  email$ = this.dataStoreService.userData$
    .pipe(
      map(userData => userData.email),
      tap(email => this.emailForm.patchValue({ email })),
    );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly popoverController: PopoverController,
    private readonly dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const userData = this.dataStoreService.getUserData();
    userData.email = this.emailForm.controls.email.value;
    this.dataStoreService.updateUserData(userData)
      .pipe(
        switchMap(_ => this.popoverController.dismiss()),
      ).subscribe();
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
