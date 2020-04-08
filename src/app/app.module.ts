import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CoreModule } from './core/core.module';
import { AddRecordPageModule } from './core/pages/add-record/add-record.module';
import { CategorizeFinishPageModule } from './category/category-pending/categorize-finish/categorize-finish.module';
import { CategorizeImgPopoverPageModule } from './category/category-pending/categorize-img-popover/categorize-img-popover.module';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

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
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CategorizeFinishPageModule,
    CategorizeImgPopoverPageModule,
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (LanguageLoader),
      deps: [HttpClient],
      }
    }),
    CoreModule,
    AddRecordPageModule,
    LottieModule.forRoot({ player: playerFactory })
],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

