import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  /**
   * Get stored data via Capacitor Storage plugin
   *
   * @param  key repository key for Capacitor Storage Plugin
   * @param  defaultData default return value if data does not exist
   * @returns Observable<T>
   */
  getData<T>(key: string, defaultData: T): Observable<T> {
    return defer(() => Storage.get({ key })).pipe(
      map(raw => raw.value),
      map(value => (value && value !== '[null]') ? JSON.parse(value) : defaultData),
    );
  }

  /**
   * JSON-Stringify data and store it via Capacitor Storage plugin
   *
   * @param  data JSON-stringifiable data
   * @param  key repository key for Capacitor Storage Plugin
   * @returns Observable<T>
   */
  setData<T>(data: T, key: string): Observable<T> {
    return defer(() =>
      Storage.set({
        key,
        value: JSON.stringify(data),
      })
    ).pipe(
      map(() => data),
    );
  }
}
