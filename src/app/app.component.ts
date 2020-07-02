import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { DataStoreService } from './core/services/data-store.service';
import { GeolocationService } from './core/services/geolocation.service';
import { TranslateConfigService } from './core/services/translate-config.service';
import { first, tap } from 'rxjs/operators';


const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private dataStore: DataStoreService,
    private geolocation: GeolocationService,
    private platform: Platform,
    private router: Router,
    private translateConfigService: TranslateConfigService
  ) {
    this.translateConfigService.initialize();
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
    this.dataStore.initialize()
      .pipe(
        first(),
        tap(() => {
          if (this.dataStore.getUserData().newUser) {
            this.router.navigate(['/onboarding']);
          }
        }),
      ).subscribe(() => { }, err => console.log(err));
    SplashScreen.hide();
  }
}
