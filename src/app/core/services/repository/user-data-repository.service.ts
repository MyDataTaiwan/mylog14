import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserData } from '../../interfaces/user-data';
import { DataTemplateService } from '../data-template.service';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataRepositoryService {
  USER_DATA_REPOSITORY = 'userData';
  defaultUserData: UserData = {
    newUser: true,
    firstName: '',
    lastName: '',
    dataTemplateName: this.dataTemplateService.dataTemplateNames[0],
  };
  private readonly userData = new Subject<UserData>();
  userData$: Observable<UserData> = this.userData;

  constructor(
    private readonly dataTemplateService: DataTemplateService,
    private readonly localStorage: LocalStorageService
  ) { }

  get(): Observable<UserData> {
    return this.localStorage.getData(this.USER_DATA_REPOSITORY, this.defaultUserData);
  }

  save(userData: UserData): Observable<UserData> {
    return this.localStorage.setData(userData, this.USER_DATA_REPOSITORY)
      .pipe(tap(u => this.userData.next(u)));
  }

  resetToDefault(): Observable<UserData> {
    return this.localStorage.setData(this.defaultUserData, this.USER_DATA_REPOSITORY)
      .pipe(
        tap(u => this.userData.next(u)),
      );
  }
}
