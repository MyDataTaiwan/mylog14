import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';

@Component({
  selector: 'app-name-popover',
  templateUrl: './name-popover.page.html',
  styleUrls: ['./name-popover.page.scss'],
})
export class NamePopoverPage implements OnInit {

  nameForm = this.formBuilder.group({
    firstName: [''],
    lastName: ['']
  });
  name$ = this.dataStoreService.userData$
    .pipe(
      tap(userData => {
        this.nameForm.patchValue({ firstName: userData.firstName, lastName: userData.lastName });
      }),
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
    userData.firstName = this.nameForm.controls.firstName.value;
    userData.lastName = this.nameForm.controls.lastName.value;
    this.dataStoreService.updateUserData(userData)
      .pipe(
        switchMap(_ => this.popoverController.dismiss()),
      ).subscribe();
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
