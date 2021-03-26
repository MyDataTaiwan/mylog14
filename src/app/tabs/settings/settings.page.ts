import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  combineLatest, concat, forkJoin, Observable, of,
  Subject, timer,
} from 'rxjs';
import {
  buffer, debounceTime, filter, first, map,
  mergeMap, switchMap, take, takeUntil, tap,
} from 'rxjs/operators';
import { UserData } from 'src/app/core/interfaces/user-data';

import { Plugins } from '@capacitor/core';
import { FormService, UserDataFormField } from '@core/forms/form.service';
import { DataTemplateService } from '@core/services/data-template.service';
import { LanguageService } from '@core/services/language.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { StyleService } from '@core/services/style.service';
import { UtilityService } from '@core/services/utility.service';
import { IonContent, IonDatetime } from '@ionic/angular';
import { LoadingService } from '@shared/services/loading.service';
import {
  PopoverButtonSet, PopoverService,
} from '@shared/services/popover.service';
import { ToastService } from '@shared/services/toast.service';

import { version } from '../../../../package.json';

const { Browser } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;

  fakeDataDays = 1;
  private readonly destroy$ = new Subject();

  @ViewChild('dateOfBirthPicker') dateOfBirthPicker: IonDatetime;

  readonly appVersion = version;
  readonly languages = this.languageService.getAvailableLanguages();
  readonly dataTemplateNames = this.dataTemplateService.dataTemplateNames;
  // Supported sizes: ['small', 'medium', 'large', 'veryLarge'];
  readonly fontSizes = ['small', 'large'];
  showSelects = true;

  userData$: Observable<UserData> = this.dataStore.userData$;

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

  private readonly updateFromPopover = new Subject<UserDataFormField>();
  updateFromPopover$ = this.updateFromPopover
    .pipe(
      switchMap(field => forkJoin([this.dataStore.userData$.pipe(take(1)), of(field)])),
      switchMap(([userData, field]) => this.showPopoverToEditField(userData, field)),
      switchMap(data => this.dataStore.updateUserData(data)),
      takeUntil(this.destroy$),
    );

  private readonly updateFromPage = new Subject<UserDataPatch>();
  updateFromPage$ = this.updateFromPage
    .pipe(
      switchMap(data => (data.language) ? this.languageService.set(data.language) : this.dataStore.updateUserData(data)),
      switchMap(() => this.dataStore.flushRecord()),
      takeUntil(this.destroy$),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly dataTemplateService: DataTemplateService,
    private readonly formService: FormService,
    private readonly languageService: LanguageService,
    private readonly loadingService: LoadingService,
    private readonly popoverService: PopoverService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly styleService: StyleService,
    private readonly utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.updateFromPopover$.subscribe();
    this.updateFromPage$.subscribe();
  }

  onClickNameItem(): void {
    this.updateFromPopover.next(UserDataFormField.NAME);
  }

  onResetAccountClicked(): void {
    this.popoverService.showPopover({
      i18nTitle: 'title.resetAccount',
      i18nMessage: 'description.resetAccount',
      i18nExtraMessage: 'description.resetAccountEraseWarning',
      buttonSet: PopoverButtonSet.CONFIRM,
      dataOnConfirm: { reset: true },
      dataOnCancel: { reset: false },
    }).pipe(
      filter(data => data?.data?.reset),
      mergeMap(() => this.eraseAccountWithLoading()),
      mergeMap(() => this.languageService.init()),
      mergeMap(() => this.router.navigate(['/onboarding'], { replaceUrl: true })),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  onChangeDateOfBirthPicker(): void {
    this.updateFromPage.next({ dateOfBirth: this.dateOfBirthPicker.value });
  }

  onChangeLanguage(event: CustomEvent): void {
    this.updateFromPage.next({ language: event.detail.value });
    this.showSelects = false;
    timer(50).
      pipe(
        first(),
        tap(() => this.showSelects = true)
      ).subscribe();
  }

  onClickAboutItem(): void {
    Browser.open({ url: 'https://numbersprotocol.io/' });
  }

  onClickVersion(): void {
    this.versionClick.next(true);
  }

  presetSelected(event: CustomEvent): void {
    this.updateFromPage.next({ dataTemplateName: event.detail.value });
  }

  fontSizeSelected(event: CustomEvent): void {
    this.updateFromPage.next({ fontSize: event.detail.value });
    this.styleService.setFontSize(event.detail.value);
  }

  uploadHostSelected(event: CustomEvent): void {
    this.updateFromPage.next({ uploadHost: event.detail.value });
  }

  // Dirty nested subscription since finalize operator unable to work in thi case.
  onMagicButtonClicked(days: number): void {
    const count = days * 10;
    this.utilityService.gen(days)
      .subscribe(
        () => { },
        () => { },
        () => this.toastService.showToast(`已產生 ${count} 筆資料`, 'primary')
          .pipe(
            takeUntil(this.destroy$),
          ).subscribe()
      );
  }

  private eraseAccountWithLoading() {
    return combineLatest([
      this.showEraseAccountLoading(),
      concat(this.dataStore.deleteAllRecords(), this.dataStore.deleteUserData()),
    ])
      .pipe(
        mergeMap(([loading, _]) => loading.dismiss()),
      );
  }

  private showEraseAccountLoading(): Observable<HTMLIonLoadingElement> {
    return this.loadingService.showLoading('title.erasingAccount');
  }

  private showPopoverToEditField(userData: UserData, field: UserDataFormField): Observable<UserData> {
    return this.popoverService.showPopover({
      i18nTitle: `title.edit${field}`,
      formModel: Object.assign({}, userData),
      formFields: this.formService.createFormFieldsByUserData(field),
    })
      .pipe(
        map(result => result.data),
        filter(data => (data)),
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

export interface UserDataPatch {
  firstName?: string;
  lastName?: string;
  dataTemplateName?: string;
  email?: string;
  dateOfBirth?: string; // ISO 8601
  userId?: string;
  language?: string;
  timezone?: string;
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  uploadHost?: string;
  fontSize?: string;
}
