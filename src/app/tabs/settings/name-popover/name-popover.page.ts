import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { PopoverController } from '@ionic/angular';
import { first, map, tap, switchMap } from 'rxjs/operators';
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
        this.nameForm.patchValue({firstName: userData.firstName, lastName: userData.lastName});
      }),
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
        userData.firstName = this.nameForm.controls.firstName.value;
        userData.lastName = this.nameForm.controls.lastName.value;
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
