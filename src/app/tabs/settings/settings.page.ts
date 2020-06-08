import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { defer, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { EmailPopoverPage } from './email-popover/email-popover.page';
import { NamePopoverPage } from "./name-popover/name-popover.page";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  name$: Observable<string>;
  email$: Observable<string>;
  dateOfBirth$: Observable<string>;
  private destroy$ = new Subject();
  private notSet: string;

  constructor(
    private translateService: TranslateService,
    private popoverController: PopoverController,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.translateService.get('SETTINGS.notSet').pipe(
      takeUntil(this.destroy$)
    ).subscribe(str => this.notSet = str);
    this.initSummary();
  }

  private initSummary() {
    this.name$ = this.dataStoreService.userData$.pipe(
      takeUntil(this.destroy$),
      map(userData => {
        if (!userData.firstName && !userData.lastName) return this.notSet;
        return `${userData.firstName} ${userData.lastName}`;
      })
    );
    this.email$ = this.dataStoreService.userData$.pipe(
      takeUntil(this.destroy$),
      map(userData => {
        if (!userData.email) return this.notSet;
        return userData.email;
      })
    );
    this.dateOfBirth$ = this.dataStoreService.userData$.pipe(
      takeUntil(this.destroy$),
      map(userData => {
        if (!userData.dateOfBirth) return this.notSet;
        return userData.dateOfBirth.toDateString();
      })
    );
  }

  onClickNameItem() {
    this.showPopover(NamePopoverPage);
  }

  onClickEmailItem() {
    this.showPopover(EmailPopoverPage);
  }

  onClickDateOfBirthItem() {
  }

  private showPopover(component) {
    defer(() => this.popoverController.create({
      component: component,
      animated: false
    })).pipe(
      switchMap(popover => popover.present()),
      takeUntil(this.destroy$)
    ).subscribe(() => { }, e => console.log(e));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
