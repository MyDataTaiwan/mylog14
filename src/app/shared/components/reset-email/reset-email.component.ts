import { Component, OnInit } from '@angular/core';

import { defer } from 'rxjs';
import { repeat, take } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss'],
})
export class ResetEmailComponent implements OnInit {

  constructor(
    private readonly modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  cancel() {
    defer(() => this.modalCtrl.dismiss())
      .pipe(
        repeat(2),
        take(2),
      ).subscribe();
  }

  onSignup() {
    defer(() => this.modalCtrl.dismiss({ email_updated: true }))
      .pipe(
        take(1),
      ).subscribe();
  }


}
