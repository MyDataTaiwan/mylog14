import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AddRecordPageModule } from './add-record/add-record.module';
import { ViewByDatePageModule } from './view-by-date/view-by-date.module';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
	return player;
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, TranslateModule.forRoot({
    loader:{
      provide: TranslateLoader,
      useFactory: (LanguageLoader),
      deps: [HttpClient]
      }
    }),
    AddRecordPageModule,
    ViewByDatePageModule,
    LottieModule.forRoot({ player: playerFactory })
],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

