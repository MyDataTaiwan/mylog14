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

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly httpClient: HttpClient,
  ) { }

  getReverseGeocoding(latitude: number, longitude: number): Observable<any> {
    const endpoint = this.baseUrl + '/reverse';
    return this.dataStore.userData$
      .pipe(
        take(1),
        map(userData => this.createReverseGeocodingParams(latitude, longitude, userData.language)),
        switchMap(params => this.httpClient.get<ReverseGeocoderResponse>(endpoint, { params })),
        map(response => `${response.address.suburb}, ${response.address.city}`),
        catchError(error => {
          console.error(error);
          return of('');
        })
      );
  }

  private createReverseGeocodingParams(latitude: number, longitude: number, language: string): HttpParams {
    return new HttpParams({
      fromObject: {
        format: 'json',
        lat: `${latitude}`,
        lon: `${longitude}`,
        zoom: `18`,
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
  address: ReverseGeocoderAddress;
  boundingbox: string[];
}

interface ReverseGeocoderAddress {
  road: string;
  city_district: string;
  village: string;
  suburb: string;
  state: string;
  postcode: string;
  city: string;
  country: string;
  country_code: string;
}
