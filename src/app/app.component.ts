import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { defer, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';

import { Plugins, StatusBarStyle } from '@capacitor/core';
import { LanguageService } from '@core/services/language.service';
import { RecordPreset } from '@core/services/preset.service';
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
    private readonly platform: Platform,
    private readonly router: Router,
    private readonly languageService: LanguageService
  ) {
    this.setStatusBarStyle().subscribe();
    this.dataInitialized()
      .pipe(
        switchMap(() => this.languageService.init()),
        switchMap(() => this.migrateUserData()),
      )
      .subscribe(userData => {
        if (userData.newUser) {
          this.router.navigate(['/onboarding'], { replaceUrl: true });
        }
        SplashScreen.hide();
      });
    this.dataStore.initializeStore().subscribe();
  }

  private setStatusBarStyle(): Observable<void> {
    const setStyle$ = defer(() => StatusBar.setStyle({ style: StatusBarStyle.Light })).pipe(first());
    return (this.platform.is('hybrid')) ? setStyle$ : of(null);
  }

  private dataInitialized(): Observable<any> {
    return this.dataStore.initialized$
      .pipe(
        filter(isInitialized => isInitialized === true),
      );
  }

  private migrateUserData() {
    return this.dataStore.userData$.pipe(
      take(1),
      map(userData => {
        const data: UserDataPatch = {};
        if (!userData.uploadHost) {
          data.uploadHost = 'mylog14';
        }
        if (!userData.recordPreset) {
          data.recordPreset = RecordPreset.COMMON_COLD;
        }
        return data;
      }),
      switchMap(data => this.dataStore.updateUserData(data)),
    );
  }
}

interface UserDataPatch {
  recordPreset?: RecordPreset;
  uploadHost?: string;
}
