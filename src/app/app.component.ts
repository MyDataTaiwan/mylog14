import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import { TranslateConfigService } from './translate-config.service';
import { StorageService } from './core/services/storage.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GeolocationService } from './core/services/geolocation.service';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  selectedLanguage: string;

  constructor(
    private platform: Platform,
    private geolocationService: GeolocationService,
    private storageService: StorageService,
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
    forkJoin([
      this.geolocationService.getPosition(),
    ]).pipe(
      tap(() => SplashScreen.hide())
    ).subscribe();
  }
  languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
