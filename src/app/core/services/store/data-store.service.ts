import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { map, switchMap, tap, first } from 'rxjs/operators';
import { UserData } from '../../interfaces/user-data';
import { RecordRepositoryService } from '../repository/record-repository.service';
import { UserDataRepositoryService } from '../repository/user-data-repository.service';
import { Record } from '../../classes/record';
import { RecordPreset } from '../preset.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private readonly initialized = new BehaviorSubject<boolean>(false);
  public initialized$: Observable<boolean> = this.initialized;

  private readonly records = new BehaviorSubject<Record[]>([]);
  public records$: Observable<Record[]> = this.records;

  private readonly userData = new BehaviorSubject<UserData>({
    firstName: '', lastName: '', recordPreset: RecordPreset.COMMON_COLD, newUser: true,
  });
  public userData$: Observable<UserData> = this.userData;


  constructor(
    private readonly recordRepo: RecordRepositoryService,
    private readonly userDataRepo: UserDataRepositoryService,
  ) {
    this.initializeStore()
      .subscribe(() => this.initialized.next(true));
  }

  pushRecord(record: Record): Observable<Record[]> {
    return this.recordRepo.save(record)
      .pipe(
        tap(newRecords => this.records.next(newRecords)),
      );
  }

  createOrReplaceUserData(userData: UserData): Observable<UserData> {
    return this.userDataRepo.save(userData)
      .pipe(
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  updateUserData(data: {}): Observable<UserData> {
    return this.userDataRepo.get()
      .pipe(
        map(userData => ({ ...userData, ...data })),
        switchMap(newUserData => this.userDataRepo.save(newUserData)),
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  private initializeStore(): Observable<[UserData, Record[]]> {
    const initUserData$ = this.userDataRepo.get()
      .pipe(
        tap(userData => this.userData.next(userData))
      );
    const initRecords$ = this.recordRepo.getAll()
      .pipe(
        tap(records => this.records.next(records))
      );
    return forkJoin([initUserData$, initRecords$]).pipe(first());
  }

}
