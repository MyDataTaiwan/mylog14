import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { defer, concat, Subject, from } from 'rxjs';
import { switchMap, takeUntil, take } from 'rxjs/operators';
import { ShareFinishPage } from '../share-finish/share-finish.page';
import { UploadService } from '../../services/upload.service';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  stage = 0;

  constructor(
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    public uploadService: UploadService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickCopy() {
    this.uploadService.generatedUrl$
      .pipe(
        take(1),
        switchMap(url => Clipboard.write({string: url})),
        switchMap(() => this.presentToastCopied()),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  cancel() {
    this.uploadService.clearUrl();
    this.popoverCtrl.dismiss();
  }

  confirm() {
    this.stage += 1;
    if (this.stage === 1) {
      this.uploadService.uploadZip()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {}, err => {
          console.log(err);
          this.stage = 4;
          this.uploadService.clearUrl();
        });
    }
    if (this.stage === 3) {
      this.uploadService.clearUrl();
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
