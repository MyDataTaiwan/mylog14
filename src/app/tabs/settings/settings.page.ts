import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { IonDatetime } from '@ionic/angular';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { buffer, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { TranslateConfigService } from 'src/app/core/services/translate-config.service';
import { version } from '../../../../package.json';
import { PopoverService } from 'src/app/core/services/popover.service';
import { FormService, UserDataFormField } from 'src/app/core/services/form.service';
import { UserDataService } from 'src/app/core/services/repository/user-data.service';
import { UserData } from 'src/app/core/interfaces/user-data';
import { RecordPreset, PresetService } from 'src/app/core/services/preset.service';

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
  recordPresets = this.presetService.presets;

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

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly translateConfigService: TranslateConfigService,
    private readonly popoverService: PopoverService,
    private readonly formService: FormService,
    private readonly userDataService: UserDataService,
    private readonly presetService: PresetService,
  ) { }

  ngOnInit() {
    this.userDataService.getUserData()
      .subscribe(userData => this.userData.next(userData));
    this.userData$
      .pipe(
        switchMap(userData => this.userDataService.saveUserData(userData)),
      ).subscribe();
    this.edit$.subscribe();
  }

  onClickNameItem(): void {
    this.edit.next(UserDataFormField.NAME);
  }

  onClickEmailItem(): void {
    this.edit.next(UserDataFormField.EMAIL);
  }

  onChangeDateOfBirthPicker(): void {
    const userData = this.userData.getValue();
    userData.dateOfBirth = this.dateOfBirthPicker.value;
    this.userData.next(userData);
  }

  onChangeLanguage(event: CustomEvent): void {
    const newLang = event.detail.value;
    this.translateConfigService.setLanguage(newLang);
    const userData = this.userData.getValue();
    userData.language = newLang;
    this.userData.next(userData);
  }

  onClickSharedLogboardLinkItem(): void {
    // this.showPopover(SharedLinkPopoverPage);
  }

  onClickAboutItem(): void {
    Browser.open({ url: 'https://mydata.org.tw/' });
  }

  onClickVersion(): void {
    this.versionClick.next(true);
  }

  presetSelected(event: CustomEvent): void {
    const userData = this.userData.getValue();
    userData.recordPreset = event.detail.value;
    this.userData.next(userData);
  }

  // TODO: Revise this
  uploadHostSelected(event: CustomEvent): void {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

}
