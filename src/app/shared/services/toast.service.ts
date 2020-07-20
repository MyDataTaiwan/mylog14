import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toastCtrl: ToastController) { }

  showToast(message: string, duration = 0): Observable<HTMLIonPopoverElement> {
    return this.createToast(message, duration).pipe(
      switchMap((toast) => this.presentToast(toast))
    );
  }

  private createToast(message: string, duration: number): Observable<HTMLIonToastElement> {
    return defer(() => this.toastCtrl.create({ message, duration }));
  }

  private presentToast(toast: HTMLIonToastElement): Observable<any> {
    return defer(() => toast.present())
      .pipe(
        switchMap(() => toast.onDidDismiss()),
      );
  }

}
