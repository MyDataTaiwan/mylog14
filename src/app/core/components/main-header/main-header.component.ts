import { Component, OnInit, Input } from '@angular/core';
import { fromEvent, Subject, interval, defer } from 'rxjs';
import { buffer, debounce, map, filter, switchMap, debounceTime, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

import { version } from '../../../../../package.json';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() headerTitle: string;

  public appVersion = version;

  titleClicks = 0;
  private click = new Subject<boolean>();
  click$ = this.click.asObservable()
    .pipe(
      buffer(this.click
        .pipe(debounceTime(500))
      ),
      tap(stream => console.log('stream', stream)),
      map(stream => stream.length),
      filter(length => length >= 3),
      switchMap(() => this.showAppVersion(this.appVersion)),
    );

  constructor(
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  onClickTitle() {
    this.click.next(true);
  }

  showAppVersion(appVersion: string) {
    return defer(() => (this.toastCtrl.create({
      message: 'App version: ' + appVersion,
      position: 'top',
      color: 'secondary',
      cssClass: 'toast',
      buttons: [{
        text: 'Dismiss',
        role: 'cancel',
      }]
    })))
      .pipe(
        switchMap(toast => toast.present()),
      );
  }

}
