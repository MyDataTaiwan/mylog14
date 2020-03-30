import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { TranslateConfigService } from './translate-config.service';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  selectedLanguage: string;

  constructor(
    private platform: Platform,
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(async() => {
      await SplashScreen.hide();
    });
  }
  languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
