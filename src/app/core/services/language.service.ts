import { Injectable } from '@angular/core';

import { iif, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { DataStoreService } from './store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly availableLanguages = ['en', 'fr', 'ja', 'zh'];
  private readonly browserLanguage = this.translateService.getBrowserLang();
  language$ = this.dataStore.userData$
    .pipe(
      map(userData => (userData.language) ? userData.language : this.browserLanguage),
    );

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
        switchMap(userData => iif(() => userData.language !== language, this.dataStore.updateUserData({ language }), of([]))),
      );
  }

}
