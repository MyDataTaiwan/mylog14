import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonDatetime, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, defer, Subject, BehaviorSubject, Observable } from 'rxjs';
import { buffer, debounceTime, filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { TranslateConfigService } from 'src/app/core/services/translate-config.service';
import { version } from '../../../../package.json';
import { EmailPopoverPage } from './email-popover/email-popover.page';
import { NamePopoverPage } from './name-popover/name-popover.page';
import { SharedLinkPopoverPage } from './shared-link-popover/shared-link-popover.page';
import { PopoverService } from 'src/app/core/services/popover.service';
import { FormService, UserDataFormField } from 'src/app/core/services/form.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { UserData } from 'src/app/core/interfaces/user-data';

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

  private readonly userData = new BehaviorSubject<UserData>(this.dataStoreService.getUserData());
  userData$: Observable<UserData> = this.userData;

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

  private readonly edit = new Subject<UserDataFormField>();
  edit$ = this.edit
    .pipe(
      switchMap(field => this.editField(field)),
    );

  private editField(field: UserDataFormField): Observable<any> {
    return this.popoverService.showPopover({
      i18nTitle: `title.edit${field}`,
      formModel: Object.assign({}, this.userData.getValue()),
      formFields: this.formService.createFormFieldsByUserData(field),
    })
      .pipe(
        map(result => result.data),
        filter(data => (data)),
        tap(userData => this.userData.next(userData)),
      );
  }

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly translateService: TranslateService,
    private readonly popoverController: PopoverController,
    private readonly translateConfigService: TranslateConfigService,
    private readonly popoverService: PopoverService,
    private readonly formService: FormService,
    private readonly userDataService: UserDataService,
  ) { }

  ngOnInit() {
    this.userDataService.getUserData()
      .subscribe(userData => this.userData.next(userData));
    this.userData$
      .pipe(
        switchMap(userData => this.userDataService.saveUserData(userData)),
      ).subscribe();
    this.edit$.subscribe();
    this.initNotSetTranslation();
  }

  private initNotSetTranslation() {
    this.translateService.onLangChange.subscribe((_: any) => {
      this.notSet = this.translateService.instant('title.notSet');
    });
  }

  onClickNameItem() {
    this.edit.next(UserDataFormField.NAME);
  }

  onClickEmailItem() {
    this.edit.next(UserDataFormField.EMAIL);
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
    // this.showPopover(SharedLinkPopoverPage);
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
        switchMap(() => this.dataStoreService.updateMetas()),
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
