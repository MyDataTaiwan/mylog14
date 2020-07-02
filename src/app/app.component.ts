import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { TranslateConfigService } from './core/services/translate-config.service';
import { switchMap, filter, first, tap } from 'rxjs/operators';
import { DataStoreService } from './core/services/store/data-store.service';
import { defer, of, Observable } from 'rxjs';
import { UserData } from './core/interfaces/user-data';


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
    private readonly translateConfigService: TranslateConfigService
  ) {
    this.setStatusBarStyle().subscribe();
    this.dataInitialized()
      .subscribe(userData => {
        this.translateConfigService.initialize(userData.language);
        if (userData.newUser) {
          this.router.navigate(['/onboarding']);
        }
        SplashScreen.hide();
      });
  }

  private setStatusBarStyle(): Observable<void> {
    const setStyle$ = defer(() => StatusBar.setStyle({ style: StatusBarStyle.Light })).pipe(first());
    return (this.platform.is('hybrid')) ? setStyle$ : of(null);
  }

  private dataInitialized(): Observable<UserData> {
    return this.dataStore.initialized$
      .pipe(
        filter(isInitialized => isInitialized === true),
        switchMap(() => this.dataStore.userData$),
      );
  }
}
