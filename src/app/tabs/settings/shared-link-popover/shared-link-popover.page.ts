import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { defer } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/store/data-store.service';
import { UserDataRepositoryService } from 'src/app/core/services/repository/user-data-repository.service';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-shared-link-popover',
  templateUrl: './shared-link-popover.page.html',
  styleUrls: ['./shared-link-popover.page.scss'],
})
export class SharedLinkPopoverPage {

  generatedUrl$ = this.userDataRepo.userData$.pipe(
    map(userData => userData.generatedUrl)
  );

  constructor(
    private readonly popoverController: PopoverController,
    private readonly toastController: ToastController,
    private readonly translateService: TranslateService,
    private readonly userDataRepo: UserDataRepositoryService,
  ) { }

  onCopy() {
    this.generatedUrl$
      .pipe(
        first(),
        switchMap(generatedUrl => Clipboard.write({ string: generatedUrl })),
        switchMap(() => this.presentToast(this.translateService.instant('title.copied')))
      ).subscribe();
  }

  private presentToast(message: string) {
    return defer(() => this.toastController.create({
      message,
      duration: 3000
    })).pipe(switchMap(toast => toast.present()));
  }

  onCancel() {
    this.popoverController.dismiss();
  }

}
