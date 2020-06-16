import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeolocationOptions, GeolocationPosition, Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { bindCallback, from, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { TranslateConfigService } from './translate-config.service';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  defaultGeolocationOptions: GeolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 120,
    timeout: 5000,
  };
  cachedPosition: GeolocationPosition;
  cachedPositionTime: number;
  cacheTimeout = 60000; // ms
  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private translateConfigService: TranslateConfigService
  ) { }

  getPosition(useCache = true): Observable<GeolocationPosition> {
    const cache = (this.isCachedPositionValid() && useCache);
    const position$ = (cache) ? of(this.cachedPosition) : from(Geolocation.getCurrentPosition(this.defaultGeolocationOptions));
    return position$
      .pipe(
        take(1),
        map(position => {
          console.log('Geolocation retrieved', position);
          this.cachedPositionTime = Date.now();
          return this.cachedPosition = position;
        }),
      );
  }

  watchPosition(geolocationOptions: GeolocationOptions = {}): Observable<any> {
    const watch = bindCallback(Geolocation.watchPosition);
    return watch(geolocationOptions);
  }

  private isCachedPositionValid(): boolean {
    const cached: boolean = !(!this.cachedPosition || !this.cachedPositionTime);
    const isTimeout = (Date.now() - this.cachedPositionTime > this.cacheTimeout);
    console.log('Use cached postion: ', (cached && !isTimeout));
    return (cached && !isTimeout);
  }

  getFromLocation(latitude: number, longitude: number): Observable<string> {
    const currentLang = this.translateConfigService.currentLanguage;
    return this.httpClient.get<ReverseGeocoderResponse>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=0&zoom=14&accept-language=${currentLang}`)
      .pipe(
        map(response => response.display_name),
        catchError(error => {
          console.error(error);
          return this.translateService.get('description.cannotGetLocation');
        })
      );
  }
}

interface ReverseGeocoderResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  boundingbox: string[];
}