import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import { TranslateConfigService } from './translate-config.service';
import { GeolocationService } from './core/services/geolocation.service';
import { DataStoreService } from './core/services/data-store.service';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  selectedLanguage: string;

  constructor(
    private dataStore: DataStoreService,
    private geolocation: GeolocationService,
    private platform: Platform,
    private router: Router,
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.initializeApp();
  }
  async initializeApp() {
    if (this.platform.is('hybrid')) {
      try {
        await StatusBar.setStyle({ style: StatusBarStyle.Light });
      } catch {
        console.log('Status Bar is not implemented in web');
      }
    }
    this.geolocation.getPosition().subscribe(); // Update location cache
    this.dataStore.updateUserData()
      .pipe(
        tap(userData => {
          if (userData.newUser) {
            this.router.navigate(['/tour']);
          }
        })
      ).subscribe(() => { }, err => console.log(err));
    SplashScreen.hide();
  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
