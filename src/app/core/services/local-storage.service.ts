import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable, defer, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  USER_DATA_REPOSITORY = 'userData';

  constructor(
  ) { }

  getUserData(): Observable<UserData> {
    const defaultUserData = {
      newUser: true,
      eulaAccepted: false,
      guideAccepted: false,
      firstName: '',
      lastName: '',
    };
    return this.getData(this.USER_DATA_REPOSITORY, defaultUserData);
  }

  saveUserData(userData: UserData): Observable<UserData> {
    return this.setData(userData, this.USER_DATA_REPOSITORY);
  }

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
