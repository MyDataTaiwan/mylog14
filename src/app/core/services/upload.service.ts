import {
  HttpClient, HttpErrorResponse, HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject, combineLatest, forkJoin, from, Observable,
  throwError,
} from 'rxjs';
import {
  catchError, filter, map, switchMap, take,
  tap,
} from 'rxjs/operators';

import { Plugins } from '@capacitor/core';

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
  private readonly generatedUrl = new BehaviorSubject<string>('');
  public generatedUrl$ = this.generatedUrl.asObservable();
  private readonly ApiUrl = 'https://logboard-dev.numbersprotocol.io';
  constructor(
    private readonly http: HttpClient,
    private readonly recordRepo: RecordRepositoryService,
    private readonly dataStore: DataStoreService,
  ) {
    this.getUserCredential().subscribe(userCredential => this.userCredential.next(userCredential));
  }

  upload() {
    return forkJoin([this.getToken(), this.createRecordPayloads()])
      .pipe(
        switchMap(([token, payloads]) =>
          forkJoin(payloads.map(payload => this.postRecord(payload, token)))
        ),
      );
  }

  private getToken(): Observable<string> {
    return this.userCredential$
      .pipe(
        tap(e => console.log('userC', e)),
        filter(userCredential => userCredential != null),
        take(1),
        switchMap(userCredential => {
          return this.createNewUID(userCredential)
            .pipe(
              tap(e => console.log('uid', e)),
              switchMap(uid => this.login(uid, userCredential)),
            );
        }),
        tap(e => console.log('token', e)),
      );
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

  private createNewUID(userCredential: UserCredential): Observable<string> {
    const endpoint = this.ApiUrl + '/api/v1/users/';
    const formData = new FormData();
    formData.append('email', userCredential.email);
    formData.append('password', userCredential.password);
    return this.http.post<CreateUserResponse>(endpoint, formData)
      .pipe(
        map(createUserResponse => createUserResponse.id),
      );
  }

  private login(uid: string, userCredential: UserCredential): Observable<string> {
    const endpoint = this.ApiUrl + '/api/v1/auth/token/login/';
    const formData = new FormData();
    formData.append('id', uid);
    formData.append('password', userCredential.password);
    return this.http.post<LoginResponse>(endpoint, formData)
      .pipe(
        map(loginResponse => loginResponse.auth_token),
      );
  }

  private postRecord(payload: FormData, token: string) {
    const endpoint = this.ApiUrl + '/api/v1/records/';
    const headers = new HttpHeaders({
      authorization: `token ${token}`,
    });
    return this.http.post<CreateRecordResponse>(endpoint, payload, { headers });
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
        tap(e => console.log('payloads', e)),
      );
  }

  private postArchive(blob: Blob) {
    const hostUrl = {
      LOCAL: 'http://127.0.0.1:8000',
      DEV: 'https://logboard-dev.numbersprotocol.io',
      PROD: 'https://mylog14.numbersprotocol.io',
    };
    const endpoint = '/api/v1/archives/';
    const formData = new FormData();
    formData.append('file', blob, 'mylog.zip');
    const hostType = 'PROD';
    const url = hostUrl[hostType] + endpoint;
    return this.http.post(url, formData)
      .pipe(
        map((res: string) => res.replace(hostUrl.PROD, hostUrl[hostType])),
        tap(logboardUrl => this.generatedUrl.next(logboardUrl)),
        catchError(err => this.httpErrorHandler(err)),
      );
  }

  private httpErrorHandler(err: HttpErrorResponse) {
    return throwError(err.message || 'server error');
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
}

interface LoginResponse {
  auth_token: string;
}

interface UserCredential {
  email: string;
  password: string;
}
