import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  private readonly setLang = new Subject<string>();
  setLang$ = this.setLang
    .pipe(
      switchMap(lang => this.translateService.use(lang)),
    );

  public readonly langs = ['en', 'fr', 'ja', 'zh'];

  constructor(
    private readonly translateService: TranslateService,
  ) {
    this.setLang$.subscribe(() => console.log('Language switched'));
  }

  public get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  initialize(lang?: string): void {
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    return (lang) ? this.setLang.next(lang) : this.setLang.next(browserLang);
  }

  setLanguage(lang: string): void {
    this.setLang.next(lang);
  }
}
