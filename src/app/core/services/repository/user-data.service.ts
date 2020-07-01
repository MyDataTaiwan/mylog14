import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserData } from '../../interfaces/user-data';
import { LocalStorageService } from '../storage/local-storage.service';
import { RecordPreset } from '../preset.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  USER_DATA_REPOSITORY = 'userData';
  defaultUserData: UserData = {
    newUser: true,
    firstName: '',
    lastName: '',
    recordPreset: RecordPreset.COMMON_COLD,
  };
  private readonly userData = new Subject<UserData>();
  userData$: Observable<UserData> = this.userData;

  constructor(
    private readonly localStorage: LocalStorageService
  ) { }

  getUserData(): Observable<UserData> {
    return this.localStorage.getData(this.USER_DATA_REPOSITORY, this.defaultUserData);
  }

  saveUserData(userData: UserData): Observable<UserData> {
    return this.localStorage.setData(userData, this.USER_DATA_REPOSITORY)
      .pipe(tap(u => this.userData.next(u)));
  }
}
