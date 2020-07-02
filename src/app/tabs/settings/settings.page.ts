import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonDatetime, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, defer, Subject } from 'rxjs';
import { buffer, debounceTime, filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { TranslateConfigService } from 'src/app/core/services/translate-config.service';
import { version } from '../../../../package.json';
import { EmailPopoverPage } from './email-popover/email-popover.page';
import { NamePopoverPage } from './name-popover/name-popover.page';
import { SharedLinkPopoverPage } from './shared-link-popover/shared-link-popover.page';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject();
  SymptomNameList: any;
  @ViewChild('dateOfBirthPicker', { static: false }) dateOfBirthPicker: IonDatetime;
  languages = this.translateConfigService.langs;
  private notSet: string = this.translateService.instant('title.notSet');

  appVersion = version;
  showDeveloperOptions = false;
  private readonly versionClick = new Subject<boolean>();
  versionClick$ = this.versionClick.pipe(
    buffer(this.versionClick
      .pipe(debounceTime(500))
    ),
    map(stream => stream.length),
    filter(length => length >= 5), // Only when 5 click events emits, interval of each < 500
    tap(() => this.showDeveloperOptions = true),
  );

  name$ = combineLatest([this.dataStoreService.userData$, this.translateConfigService.stream()]).pipe(
    map(([userData, _]) => {
      if (!userData.firstName && !userData.lastName) {
        return this.notSet;
      }
      return `${userData.firstName} ${userData.lastName}`;
    })
  );
  email$ = combineLatest([this.dataStoreService.userData$, this.translateConfigService.stream()]).pipe(
    map(([userData, _]) => {
      if (!userData.email) {
        return this.notSet;
      }
      return userData.email;
    })
  );
  dateOfBirth$ = this.dataStoreService.userData$.pipe(
    map(userData => {
      if (!userData.dateOfBirth) {
        return '';
      }
      return userData.dateOfBirth;
    })
  );
  currentLanguage$ = this.dataStoreService.userData$.pipe(
    map(userData => {
      if (!userData.language) {
        return this.translateService.defaultLang;
      }
      return userData.language;
    })
  );
  defaultSchema$ = this.dataStoreService.userData$.pipe(
    map(userData => (userData.defaultSchema) ? 'default' : 'custom'),
  );
  hasGeneratedSharedLink$ = this.dataStoreService.userData$.pipe(
    map(userData => userData.generatedUrl),
    map(generatedUrl => !!generatedUrl)
  );

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly translateService: TranslateService,
    private readonly popoverController: PopoverController,
    private readonly translateConfigService: TranslateConfigService
  ) { }

  ngOnInit() {
    this.initNotSetTranslation();
  }

  private initNotSetTranslation() {
    this.translateService.onLangChange.subscribe((_: any) => {
      this.notSet = this.translateService.instant('title.notSet');
    });
  }

  onClickNameItem() {
    this.showPopover(NamePopoverPage);
  }

  onClickEmailItem() {
    this.showPopover(EmailPopoverPage);
  }

  onChangeDateOfBirthPicker() {
    const userData = this.dataStoreService.getUserData();
    userData.dateOfBirth = this.dateOfBirthPicker.value;
    this.dataStoreService.updateUserData(userData)
      .subscribe();
  }

  onChangeLanguage(event: CustomEvent) {
    const newLang = event.detail.value;
    this.translateConfigService.setLanguage(newLang).subscribe();
  }

  onClickSharedLogboardLinkItem() {
    this.showPopover(SharedLinkPopoverPage);
  }

  onClickAboutItem() {
    Browser.open({ url: 'https://mydata.org.tw/' });
  }

  onClickVersion() {
    this.versionClick.next(true);
  }

  symptomSelected(event: CustomEvent) {
    const userData = this.dataStoreService.getUserData();
    userData.defaultSchema = (event.detail.value === 'default') ? true : false;
    this.dataStoreService.updateUserData(userData)
      .pipe(
        switchMap(() => this.dataStoreService.updateRecordMetas()),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  uploadHostSelected(event: CustomEvent) {
    const userData = this.dataStoreService.getUserData();
    userData.uploadHost = event.detail.value;
    this.dataStoreService.updateUserData(userData)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe(() => { }, err => console.log(err));
  }

  private showPopover(component: any) {
    defer(() => this.popoverController.create({
      component,
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
