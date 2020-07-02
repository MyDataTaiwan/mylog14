import { Component, OnDestroy } from '@angular/core';

import { defer, forkJoin, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
import {
  UserDataRepositoryService,
} from '@core/services/repository/user-data-repository.service';
import { UploadService } from '@core/services/upload.service';
import { PopoverController, ToastController } from '@ionic/angular';

const { Clipboard } = Plugins;

enum Stage {
  AreYouSure = 0,
  Upload = 1,
  ShareToWhom = 2,
  Shared = 3,
  Error = 4
}

@Component({
  selector: 'app-share-popover',
  templateUrl: './share-popover.page.html',
  styleUrls: ['./share-popover.page.scss'],
})
export class SharePopoverPage implements OnDestroy {

  destroy$ = new Subject();
  stage = Stage.AreYouSure;
  StageEnum = Stage;

  constructor(
    public readonly uploadService: UploadService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastCtrl: ToastController,
    private readonly userDataRepo: UserDataRepositoryService,
  ) { }

  confirm() {
    this.stage += 1;
    if (this.stage === Stage.Upload) {
      forkJoin([this.uploadService.uploadZip(), this.userDataRepo.get()])
        .pipe(
          map(([generatedUrl, userData]) => ({...userData, generatedUrl})),
          switchMap(userData => this.userDataRepo.save(userData))
        )
        .subscribe(() => { }, err => {
          console.log(err);
          this.stage = Stage.Error;
          this.uploadService.clearUrl();
        });
    }
    if (this.stage === Stage.Shared) {
      this.uploadService.clearUrl();
    }
  }

  onClickCopy() {
    this.uploadService.generatedUrl$
      .pipe(
        take(1),
        switchMap(url => Clipboard.write({ string: url })),
        switchMap(() => this.presentToastCopied()),
        takeUntil(this.destroy$)
      )
      .subscribe();
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

  cancel() {
    this.uploadService.clearUrl();
    this.popoverCtrl.dismiss();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
