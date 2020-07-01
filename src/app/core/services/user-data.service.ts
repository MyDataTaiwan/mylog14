import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { LocalStorageService } from './local-storage.service';
import { RecordPreset } from './preset.service';

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

  constructor(
    private readonly localStorage: LocalStorageService
  ) { }

  getUserData(): Observable<UserData> {
    return this.localStorage.getData(this.USER_DATA_REPOSITORY, this.defaultUserData);
  }

  saveUserData(userData: UserData): Observable<UserData> {
    return this.localStorage.setData(userData, this.USER_DATA_REPOSITORY);
  }
}
