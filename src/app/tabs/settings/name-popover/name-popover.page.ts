import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { PopoverController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

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

  private constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.nameForm.controls.firstName.value);
    this.popoverController.dismiss();
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
