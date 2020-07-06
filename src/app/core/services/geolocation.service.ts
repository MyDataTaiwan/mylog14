import { Injectable } from '@angular/core';

import { bindCallback, from, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import {
  GeolocationOptions, GeolocationPosition, Plugins,
} from '@capacitor/core';

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

}
