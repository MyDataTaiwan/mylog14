import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { PopoverController } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
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

  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.initEmail();
  }

  private initEmail() {
    this.dataStoreService.userData$.pipe(
      first(),
      map(userData => userData.email)
    ).subscribe(email => {
      this.emailForm.controls.email.setValue(email);
    });
  }

  onSubmit() {
    this.dataStoreService.userData$.pipe(
      first(),
      map(userData => {
        userData.email = this.emailForm.controls.email.value;
        return userData;
      })
    ).subscribe(userData => this.dataStoreService.updateUserData(userData).pipe(first()).subscribe());
    this.popoverController.dismiss();
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
