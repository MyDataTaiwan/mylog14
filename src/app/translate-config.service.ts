import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first, map } from 'rxjs/operators';
import { DataStoreService } from './core/services/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  readonly langs = ['en', 'fr', 'ja', 'zh'];

  constructor(
    private translateService: TranslateService,
    private dataStoreService: DataStoreService
  ) { }

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

  setLanguage(lang: string) {
    this.dataStoreService.userData$.pipe(
      first(),
      map(userData => {
        userData.language = lang;
        console.log(userData);
        return userData;
      })
    ).subscribe(userData => this.dataStoreService.updateUserData(userData).pipe(first()).subscribe());
    this.translateService.use(lang);
  }
}
