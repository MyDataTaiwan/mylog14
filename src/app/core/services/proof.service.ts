import { Injectable } from '@angular/core';
import { Proof } from '../interfaces/proof';
import { LocationProof } from '../interfaces/location-proof';
import { Observable } from 'rxjs';
import { GeolocationService } from './geolocation.service';
import { map } from 'rxjs/operators';

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
          const location = geolocationPosition.coords as LocationProof;
          return { timestamp: Date.now(), location } as Proof;
        })
      );
  }

  createProofWithoutLocation(): Proof {
    return { timestamp: Date.now() };
  }
}
