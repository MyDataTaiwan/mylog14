import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  readonly langs = ['en', 'fr', 'ja', 'zh'];

  constructor(
    private translateService: TranslateService,
    private dataStoreService: DataStoreService
  ) { }


  public get currentLanguage(): string {
    return this.translateService.currentLang;
  }


  initialize() {
    this.getAndUseDefaultLanguage();
    this.dataStoreService.userData$.pipe(
      map(userData => userData.language)
    ).subscribe(language => {
      this.translateService.use(language);
    });
  }

  getAndUseDefaultLanguage() {
    let language = this.translateService.getBrowserLang();
    this.translateService.setDefaultLang(language);
    return language;
  }

  setLanguage(lang: string): Observable<UserData> {
    this.translateService.use(lang);
    return this.dataStoreService.userData$.pipe(
      first(),
      map(userData => {
        userData.language = lang;
        return userData;
      }),
      switchMap(userData => this.dataStoreService.updateUserData(userData))
    );
  }

  stream(): Observable<string> {
    return this.translateService.stream(this.langs);
  }
}
