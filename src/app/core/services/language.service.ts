import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { DataStoreService } from './store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly availableLanguages = ['en', 'fr', 'ja', 'zh'];
  private readonly browserLanguage = this.translateService.getBrowserLang();

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('en');
  }

  init(): Observable<any> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        map(userData => (userData.language) ? userData.language : this.browserLanguage),
        switchMap(language => this.set(language)),
      );
  }

  get(): Observable<string> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        map(userData => userData.language),
      );
  }

  getAvailableLanguages(): string[] {
    return this.availableLanguages;
  }

  set(language: string): Observable<any> {
    return this.translateService.use(language)
      .pipe(
        switchMap(() => this.setUserDataLanguageIfDifferent(language)),
      );
  }

  // Only update if userData.language differs from the language to be set
  private setUserDataLanguageIfDifferent(language: string): Observable<any> {
    return this.dataStore.userData$
      .pipe(
        take(1),
        filter(userData => userData.language !== language),
        switchMap(() => this.dataStore.updateUserData({ language })),
      );
  }

}
