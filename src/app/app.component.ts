import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import { TranslateConfigService } from './translate-config.service';
import { StorageService } from './core/services/storage.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GeolocationService } from './core/services/geolocation.service';
import { RecordService } from './core/services/record.service';
import { DataStoreService } from './core/services/data-store.service';

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
    private platform: Platform,
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
    this.dataStore.updateDailyRecords().subscribe();
    SplashScreen.hide();
  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
