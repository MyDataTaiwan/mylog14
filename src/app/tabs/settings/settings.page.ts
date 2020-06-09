import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { IonDatetime, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { defer, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { EmailPopoverPage } from './email-popover/email-popover.page';
import { NamePopoverPage } from "./name-popover/name-popover.page";

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  name$: Observable<string>;
  email$: Observable<string>;
  dateOfBirth$: Observable<string>;
  @ViewChild('dateOfBirthPicker', { static: false }) dateOfBirthPicker: IonDatetime;
  languages = this.translateConfigService.langs;
  currentLanguage$: Observable<string>;
  private destroy$ = new Subject();
  private notSet: string;

  constructor(
    private translateService: TranslateService,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private dataStoreService: DataStoreService
  ) { }

  ngOnInit() {
    this.initNotSetTranslation();
    this.initSummary();
  }

  private initNotSetTranslation() {
    this.notSet = this.translateService.instant('SETTINGS.notSet');
    this.translateService.onLangChange.subscribe((_: any) => {
      this.notSet = this.translateService.instant('SETTINGS.notSet');
    });
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
        if (!userData.dateOfBirth) return '';
        return userData.dateOfBirth;
      })
    );
    this.currentLanguage$ = this.dataStoreService.userData$.pipe(
      takeUntil(this.destroy$),
      map(userData => {
        if (!userData.language) return this.translateService.defaultLang;
        return userData.language;
      })
    );
  }

  onClickNameItem() {
    this.showPopover(NamePopoverPage);
  }

  onClickEmailItem() {
    this.showPopover(EmailPopoverPage);
  }

  onChangeDateOfBirthPicker() {
    this.dataStoreService.userData$.pipe(
      first(),
      map(userData => {
        userData.dateOfBirth = this.dateOfBirthPicker.value;
        return userData;
      })
    ).subscribe(userData => this.dataStoreService.updateUserData(userData).pipe(first()).subscribe());
  }

  onChangeLanguage(event: CustomEvent) {
    const newLang = event.detail.value;
    this.translateConfigService.setLanguage(newLang);
  }

  onClickAboutItem() {
    Browser.open({ url: 'https://mydata.org.tw/' });
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
