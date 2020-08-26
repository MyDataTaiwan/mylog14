import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject, combineLatest, forkJoin, from, merge,
  Observable, of, Subject,
} from 'rxjs';
import {
  catchError, filter, map, mergeScan, retry,
  switchMap, take, tap,
} from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
import { SharedLink } from '@core/interfaces/shared-link';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@shared/services/toast.service';

import {
  RecordRepositoryService,
} from './repository/record-repository.service';
import { DataStoreService } from './store/data-store.service';

const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private readonly userCredential = new BehaviorSubject<UserCredential>(null);
  userCredential$: Observable<UserCredential> = this.userCredential;

  private isUploading = false;
  private readonly uploadTrigger = new Subject();

  doneRecordResetter = new Subject<number>();
  private readonly uploadStatusUpdater = new Subject<number>();
  private readonly uploadStatus = new BehaviorSubject<UploadStatus>(null);
  uploadStatus$: Observable<UploadStatus> = this.uploadStatus;

  token: string;
  newSharedLink: SharedLink;
  cachedPayloads: FormData[];
  private ApiUrl = 'https://mylog14.numbersprotocol.io';
  constructor(
    private readonly http: HttpClient,
    private readonly recordRepo: RecordRepositoryService,
    private readonly dataStore: DataStoreService,
    private readonly toastService: ToastService,
    private readonly translateService: TranslateService,
  ) {
    this.getUserCredential().subscribe(userCredential => this.userCredential.next(userCredential));
    this.uploadStatusHandler().subscribe();
    this.uploadHostHandler().subscribe();
  }

  startUpload(): boolean {
    if (this.isUploading) {
      return false;
    }
    this.upload()
      .pipe(
        catchError(err => {
          this.isUploading = false;
          this.resetUploadStatus();
          throw new ErrorEvent('http', {
            message: this.translateService.instant('description.uploadFailed'),
          });
        })
      ).subscribe();
    return true;
  }

  private uploadHostHandler() {
    return this.dataStore.userData$
      .pipe(
        map(userData => userData.uploadHost),
        filter(uploadHost => uploadHost != null),
        tap(uploadHost => this.ApiUrl = `https://${uploadHost}.numbersprotocol.io`),
        tap(() => console.log('Set upload host to', this.ApiUrl))
      );
  }

  private upload() {
    return forkJoin([this.createNewUserAndSharedLink(), this.createRecordPayloads()])
      .pipe(
        take(1),
        tap(() => {
          this.isUploading = true;
          this.newSharedLink.recordCount = this.cachedPayloads.length;
          this.resetUploadStatus();
        }),
        switchMap(() => this.login(this.newSharedLink.uid)),
        switchMap(() =>
          merge(
            ...this.cachedPayloads.map(payload => this.postRecord(payload, this.token)),
            this.doneRecordResetter
          )
        ),
        mergeScan((arr, value) => {
          return (value === 0) ? of(0) : of(arr + value);
        }, 0),
        tap(done => this.uploadStatusUpdater.next(done)),
        filter(done => done === this.newSharedLink.recordCount),
        switchMap(() => this.dataStore.pushSharedLink(this.newSharedLink)),
        tap(() => {
          this.isUploading = false;
        }),
      );
  }

  private uploadStatusHandler() {
    return this.uploadStatusUpdater
      .pipe(
        map(done => ({
          total: this.uploadStatus.getValue()?.total,
          done,
        })),
        tap(newStatus => this.uploadStatus.next(newStatus)),
      );

  }

  private resetUploadStatus() {
    this.uploadStatus.next({ total: this.newSharedLink?.recordCount, done: 0 });
    this.doneRecordResetter.next(0);
  }

  private createSharedLink(uid: string, url: string, recordCount?: number): SharedLink {
    const createTime = Date.now();
    const expireDays = 3;
    const expireTime = createTime + 86400 * 1000 * expireDays;
    return { uid, url, createTime, expireTime, recordCount, };
  }

  private getUserCredential(): Observable<UserCredential> {
    return combineLatest([
      this.dataStore.userData$
        .pipe(
          map(userData => userData.email)
        ),
      from(Device.getInfo())
        .pipe(
          map(info => info.uuid)
        ),
    ]).pipe(
      map(([email, uuid]) => ({ email, password: uuid })),
    );
  }

  private createNewUserAndSharedLink(): Observable<SharedLink> {
    const endpoint = this.ApiUrl + '/api/v1/users/';
    const formData = new FormData();
    formData.append('email', this.userCredential.getValue().email);
    formData.append('password', this.userCredential.getValue().password);
    return this.http.post<CreateUserResponse>(endpoint, formData)
      .pipe(
        map(createUserResponse => this.createSharedLink(createUserResponse.id, createUserResponse.href)),
        tap(link => this.newSharedLink = link),
      );
  }

  private login(uid: string): Observable<string> {
    const endpoint = this.ApiUrl + '/api/v1/auth/token/login/';
    const formData = new FormData();
    formData.append('id', uid);
    formData.append('password', this.userCredential.getValue().password);
    return this.http.post<LoginResponse>(endpoint, formData)
      .pipe(
        map(loginResponse => loginResponse.auth_token),
        tap(token => this.token = token),
      );
  }

  private postRecord(payload: FormData, token: string): Observable<number> {
    const endpoint = this.ApiUrl + '/api/v1/records/';
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });
    return this.http.post<CreateRecordResponse>(endpoint, payload, { headers })
      .pipe(
        retry(5),
        map(() => 1),
      );
  }

  private createRecordPayloads(): Observable<FormData[]> {
    return forkJoin([
      this.recordRepo.getTransactionHashes(),
      this.recordRepo.getJsonAll(),
    ])
      .pipe(
        map(([transactionHashes, jsons]) => transactionHashes.map((hash, idx) => {
          const formData = new FormData();
          formData.append('raw_content', jsons[idx]);
          formData.append('transaction_hash', hash);
          return formData;
        })),
        tap(payloads => this.cachedPayloads = payloads),
      );
  }

}

interface CreateRecordResponse {
  id: number;
  raw_content: string;
  transaction_hash: string;
  owner: string;
}

interface CreateUserResponse {
  id: string;
  username: string;
  email: string;
  href: string;
}

interface LoginResponse {
  auth_token: string;
}

interface UserCredential {
  email: string;
  password: string;
}

interface UploadStatus {
  total: number;
  done: number;
}
