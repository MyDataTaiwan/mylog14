import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable, defer, from } from 'rxjs';
import { map } from 'rxjs/operators';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
  ) { }

  getData<T>(repo: string, defaultData: T): Observable<T> {
    return defer(() => from(Storage.get({ key: repo }))).pipe(
      map(raw => raw.value),
      map(value => (value) ? JSON.parse(value) : defaultData),
    );
  }

  setData<T>(data: T, repo: string): Observable<T> {
    return defer(() =>
      from(Storage.set({
        key: repo,
        value: JSON.stringify(data),
      }))
    ).pipe(
      map(() => data),
    );
  }
}
