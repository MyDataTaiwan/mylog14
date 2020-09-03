import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { defer, Observable, of } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';

import { Plugins, StatusBarStyle } from '@capacitor/core';
import { DataTemplateService } from '@core/services/data-template.service';
import { LanguageService } from '@core/services/language.service';
import { StyleService } from '@core/services/style.service';
import { Platform } from '@ionic/angular';

import { DataStoreService } from './core/services/store/data-store.service';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly dataTemplateService: DataTemplateService,
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly languageService: LanguageService,
    private readonly styleService: StyleService,
  ) {
    this.setStatusBarStyle().subscribe();
    this.dataInitialized()
      .pipe(
        switchMap(() => this.languageService.init()),
        switchMap(() => this.migrateUserData()),
        switchMap(() => this.styleService.updateFontSize()),
      )
      .subscribe(userData => {
        if (userData.newUser) {
          this.router.navigate(['/onboarding'], { replaceUrl: true });
        }
        SplashScreen.hide();
      });
  }

  private setStatusBarStyle(): Observable<void> {
    const setStyle$ = defer(() => StatusBar.setStyle({ style: StatusBarStyle.Light })).pipe(first());
    return (this.platform.is('hybrid')) ? setStyle$ : of(null);
  }

  private dataInitialized(): Observable<any> {
    return this.dataTemplateService.initialize()
      .pipe(
        switchMap(() => this.dataStore.initialize()),
      );
  }

  private migrateUserData() {
    return this.dataStore.userData$.pipe(
      take(1),
      map(userData => {
        const data: UserDataPatch = {};
        if (!userData.uploadHost) {
          data.uploadHost = 'api.logboard';
        }
        if (!userData.dataTemplateName) {
          if (userData?.recordPreset) {
            data.dataTemplateName = userData.recordPreset;
          } else {
            data.dataTemplateName = this.dataTemplateService.dataTemplateNames[0];
          }
        }
        if (!userData.fontSize) {
          data.fontSize = 'small';
        }
        return data;
      }),
      switchMap(data => this.dataStore.updateUserData(data)),
    );
  }

}

interface UserDataPatch {
  dataTemplateName?: string;
  uploadHost?: string;
  fontSize?: string;
}
