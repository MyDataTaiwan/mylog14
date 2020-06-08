import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { PopoverController } from '@ionic/angular';
import { first, map } from 'rxjs/operators';
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

  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.initName();
  }

  private initName() {
    this.dataStoreService.userData$.pipe(
      first()
    ).subscribe(userData => {
      this.nameForm.controls.firstName.setValue(userData.firstName);
      this.nameForm.controls.lastName.setValue(userData.lastName);
    });
  }

  onSubmit() {
    this.dataStoreService.userData$.pipe(
      first(),
      map(userData => {
        userData.firstName = this.nameForm.controls.firstName.value;
        userData.lastName = this.nameForm.controls.lastName.value;
        return userData;
      })
    ).subscribe(userData => this.dataStoreService.updateUserData(userData).pipe(first()).subscribe());
    this.popoverController.dismiss();
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
