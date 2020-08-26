import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly translate: TranslateService,
  ) { }

  showLoading(i18nMessage: string, dismissTime: number = 0): Observable<HTMLIonLoadingElement> {
    return this.createLoading(i18nMessage, dismissTime)
      .pipe(
        switchMap(loading => this.presentLoading(loading)),
      );
  }

  private createLoading(i18nMessage: string, dismissTime: number): Observable<HTMLIonLoadingElement> {
    return this.translate.get(i18nMessage)
      .pipe(
        switchMap(message => this.loadingCtrl.create({
          message,
          duration: dismissTime,
        })),
      );
  }

  private presentLoading(loading: HTMLIonLoadingElement): Observable<HTMLIonLoadingElement> {
    return defer(() => loading.present())
      .pipe(
        map(() => loading),
      );
  }
}
