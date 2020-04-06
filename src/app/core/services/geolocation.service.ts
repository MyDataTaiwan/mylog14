import { Injectable } from '@angular/core';
import { Plugins, GeolocationOptions, GeolocationPosition } from '@capacitor/core';
import { bindCallback, Observable, from, of } from 'rxjs';
import { take, map, timeout } from 'rxjs/operators';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  cachedPosition: GeolocationPosition;
  cachedPositionTime: number;
  cacheTimeout = 60000; // ms
  constructor() { }

  getPosition(useCache = true): Observable<GeolocationPosition> {
    const position$ = (this.isCachedPositionValid() && useCache) ? of(this.cachedPosition) : from(Geolocation.getCurrentPosition());
    return position$
      .pipe(
        take(1),
        timeout(3000),
        map(position => {
          console.log('Not timeout?', position);
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
    const isTimeout = (Date.now() - this.cachedPositionTime < this.cacheTimeout);
    console.log('Use cached postion: ', (cached && !isTimeout));
    return (cached && !isTimeout);
  }
}
