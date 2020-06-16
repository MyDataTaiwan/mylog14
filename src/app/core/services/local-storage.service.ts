import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  /**
   * @param  repo repository identifier for Capacitor Storage Plugin
   * @param  defaultData default return value if data does not exist
   * @returns Observable<T>
   */
  getData<T>(repo: string, defaultData: T): Observable<T> {
    return defer(() => Storage.get({ key: repo })).pipe(
      map(raw => raw.value),
      map(value => (value) ? JSON.parse(value) : defaultData),
    );
  }

  /**
   * @param  data JSON-stringifiable data
   * @param  repo repository identifier for Capacitor Storage Plugin
   * @returns Observable<T>
   */
  setData<T>(data: T, repo: string): Observable<T> {
    return defer(() =>
      Storage.set({
        key: repo,
        value: JSON.stringify(data),
      })
    ).pipe(
      map(() => data),
    );
  }
}
