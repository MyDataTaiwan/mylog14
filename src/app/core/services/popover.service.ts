import { Injectable, ComponentRef } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, defer } from 'rxjs';
import { PopoverComponent } from '../components/popover/popover.component';
import { switchMap, mergeMap, filter, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  showPopover() {
    return this.createPopover()
      .pipe(
        switchMap(popover => this.presentPopover(popover)),
      );
  }

  private createPopover(componentProps = {}): Observable<HTMLIonPopoverElement> {
    return defer(() => this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps,
    }));
  }

  private presentPopover(popover: HTMLIonPopoverElement, dismissTime?: number): Observable<boolean> {
    return defer(() => popover.present())
      .pipe(
        filter(() => !(dismissTime == null)),
        delay(dismissTime),
        switchMap(() => popover.dismiss()),
      );
  }
}
