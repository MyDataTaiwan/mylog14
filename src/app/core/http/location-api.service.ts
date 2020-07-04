import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { DataStoreService } from '@core/services/store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {

  baseUrl = 'https://nominatim.openstreetmap.org';
  googleMapBaseUrl = 'https://maps.google.com.tw';

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly httpClient: HttpClient,
  ) { }

  getMap(latitude: number, longitude: number): Observable<string> {
    const endpoint = this.googleMapBaseUrl + '/maps';
    const params = this.createMapParams(latitude, longitude);
    return this.httpClient.get<string>(endpoint, { params })
      .pipe(
        catchError(error => {
          console.error(error);
          return of('');
        })
      );
  }

  getReverseGeocoding(latitude: number, longitude: number): Observable<any> {
    const endpoint = this.baseUrl + '/reverse';
    return this.dataStore.userData$
      .pipe(
        take(1),
        map(userData => this.createReverseGeocodingParams(latitude, longitude, userData.language)),
        switchMap(params => this.httpClient.get<ReverseGeocoderResponse>(endpoint, { params })),
        map(response => response.display_name),
        catchError(error => {
          console.error(error);
          return of('');
        })
      );
  }

  private createMapParams(latitude: number, longitude: number): HttpParams {
    return new HttpParams({
      fromObject: {
        f: 'q',
        hl: 'zh-TW',
        z: '16',
        output: 'embed',
        q: `${latitude},${longitude}`
      }
    });
  }

  private createReverseGeocodingParams(latitude: number, longitude: number, language: string): HttpParams {
    return new HttpParams({
      fromObject: {
        format: 'json',
        lat: `${latitude}`,
        lon: `${longitude}`,
        addressdetails: `0`,
        zoom: `14`,
        language,
      }
    });
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
