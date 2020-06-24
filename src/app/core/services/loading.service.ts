import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private readonly loadingCtrl: LoadingController,
  ) { }

  showLoading(message: string, dismissTime: number = 0): Observable<HTMLIonLoadingElement> {
    return this.createLoading(message, dismissTime)
      .pipe(
        switchMap(loading => this.presentLoading(loading)),
      );
  }

  private createLoading(message: string, dismissTime: number): Observable<HTMLIonLoadingElement> {
    return defer(() => this.loadingCtrl.create({
      message,
      duration: dismissTime,
    }));
  }

  private presentLoading(loading: HTMLIonLoadingElement): Observable<HTMLIonLoadingElement> {
    return defer(() => loading.present())
      .pipe(map(() => loading));
  }
}
