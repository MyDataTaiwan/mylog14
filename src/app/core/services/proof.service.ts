import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeolocationPosition } from '@capacitor/core';
import { LocationProof } from '@core/interfaces/location-proof';

import { Proof } from '../interfaces/proof';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class ProofService {

  constructor(
    private readonly geolocationService: GeolocationService,
  ) { }

  createProof(): Observable<Proof> {
    return this.geolocationService.getPosition()
      .pipe(
        map(geolocationPosition => {
          const location = this.getLocationProof(geolocationPosition);
          return { timestamp: Date.now(), location } as Proof;
        })
      );
  }

  createProofWithoutLocation(): Proof {
    return { timestamp: Date.now() };
  }

  /** WORKAROUND:
   * For some unknown reason neither Object.assign() nor spread syntax works on copying the geoposition
   *  manually copy each property of the GeolocationPosition
   */
  private getLocationProof(position: GeolocationPosition): LocationProof {
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
    } as LocationProof;
  }
}
