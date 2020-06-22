import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  readonly langs = ['en', 'fr', 'ja', 'zh'];

  constructor(
    private readonly translateService: TranslateService,
    private readonly dataStoreService: DataStoreService
  ) { }


  public get currentLanguage(): string {
    return this.translateService.currentLang;
  }


  initialize() {
    this.translateService.setDefaultLang('en');
    if (!this.dataStoreService.getUserData().language) {
      this.translateService.use(this.translateService.getBrowserLang());
    } else {
      this.translateService.use(this.dataStoreService.getUserData().language);
    }
  }

  setLanguage(lang: string): Observable<UserData> {
    this.translateService.use(lang);
    const userData = this.dataStoreService.getUserData();
    userData.language = lang;
    return this.dataStoreService.updateUserData(userData);
  }

  stream(): Observable<string> {
    return this.translateService.stream(this.langs);
  }
}
