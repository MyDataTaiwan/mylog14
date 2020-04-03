import { Injectable } from '@angular/core';
import { Plugins, GeolocationOptions, GeolocationPosition } from '@capacitor/core';
import { bindCallback, Observable } from 'rxjs';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  async getCurrentPosition(): Promise<GeolocationPosition> {
    return Geolocation.getCurrentPosition();
  }

  watchPosition(geolocationOptions: GeolocationOptions = {}): Observable<any> {
    const watch = bindCallback(Geolocation.watchPosition);
    return watch(geolocationOptions);
  }

}
