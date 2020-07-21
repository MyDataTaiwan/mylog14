import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
import { DataStoreService } from '@core/services/store/data-store.service';
import { UploadService } from '@core/services/upload.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@shared/services/toast.service';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit, OnDestroy {

  destroy$ = new Subject();
  copyTrigger$ = new Subject<string>();

  sharedLinks$ = this.dataStore.userData$
    .pipe(
      map(userData => userData.sharedLinks),
      map(sharedLinks => sharedLinks.filter(link => link != null).reverse()),
    );
  uploadStatus$ = this.uploadService.uploadStatus$;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly toastService: ToastService,
    private readonly translateService: TranslateService,
    private readonly uploadService: UploadService,
  ) { }

  ngOnInit() {
    this.copyHandler().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  copyHandler() {
    return this.copyTrigger$
      .pipe(
        switchMap(url => Clipboard.write({ string: url })),
        switchMap(() => this.showLinkCopiedToast()),
        takeUntil(this.destroy$),
      );
  }

  onUploadButtonClicked() {
    this.uploadService.startUpload();
  }

  onCopyClicked(url: string) {
    this.copyTrigger$.next(url);
  }

  showLinkCopiedToast() {
    return this.translateService.get('description.linkCopied')
      .pipe(
        switchMap(message => this.toastService.showToast(message, 3000)),
      );
  }

}
