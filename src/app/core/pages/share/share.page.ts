import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { defer, concat, Subject, from } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ShareFinishPage } from '../share-finish/share-finish.page';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  stage = 0;
  linkUrl = 'https://mylog14.numbersprotocol.io/dashboard/42ffc50c-ec72-416b-9bb6-94d8b9086766/';
  constructor(
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickCopy() {
    concat(
      Clipboard.write({
        string: this.linkUrl
      }),
      this.presentToastCopied(),
    )
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  cancel() {
    this.popoverCtrl.dismiss();
  }

  confirm() {
    if (this.stage < 2) {
      this.stage += 1;
    }
  }

  private presentToastCopied() {
    return defer(() => (this.toastCtrl.create({
      message: '連結已複製到剪貼簿',
      position: 'top',
      color: 'primary',
      cssClass: 'toast',
      duration: 1000,
    })))
      .pipe(
        switchMap(toast => toast.present()),
      );
  }

}
