import { Component, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { defer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NamePopoverPage } from "./name-popover/name-popover.page";



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnDestroy {

  private subscriptions: Subscription[] = []

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onClickNameItem() {
    let subscription = defer(() => this.popoverController.create({
      component: NamePopoverPage,
      animated: false
    })).pipe(
      switchMap(popover => popover.present())
    ).subscribe(() => { }, e => console.log(e))

    this.subscriptions.push(subscription)
  }

}
