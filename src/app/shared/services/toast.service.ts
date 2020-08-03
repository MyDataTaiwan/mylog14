import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private readonly toastCtrl: ToastController,
  ) { }

  showToast(message: string, color: string, duration = 0): Observable<HTMLIonPopoverElement> {
    return this.createToast(message, color, duration).pipe(
      switchMap((toast) => this.presentToast(toast))
    );
  }

  private createToast(message: string, color: string, duration: number): Observable<HTMLIonToastElement> {
    const buttons = [{ icon: 'close', role: 'cancel' }];
    const toastOptions = { message, color, duration, buttons };
    return defer(() => this.toastCtrl.create(toastOptions));
  }

  private presentToast(toast: HTMLIonToastElement): Observable<any> {
    return defer(() => toast.present())
      .pipe(
        switchMap(() => toast.onDidDismiss()),
      );
  }

}
