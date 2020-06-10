import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as JSZip from 'jszip';
import { defer, from, forkJoin, of, BehaviorSubject, concat, Observable, throwError } from 'rxjs';
import { DataStoreService } from './data-store.service';
import { map, switchMap, take, tap, delay, catchError, timeout, filter } from 'rxjs/operators';
import { CachedFile } from '../interfaces/cached-file';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private generatedUrl = new BehaviorSubject<string>('');
  public generatedUrl$ = this.generatedUrl.asObservable();

  constructor(
    private dataStore: DataStoreService,
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  private createCachedFiles() {
    return this.dataStore.recordMetaList$
      .pipe(
        take(1),
        map(recordMetaList => {
          const now = Date.now();
          const earliestTimeForUpload = now - 1000 * 86400 * 14; // Only upload  data in 14 Days
          return recordMetaList.filter(recordMeta => recordMeta.timestamp > earliestTimeForUpload);
        }),
        switchMap(recordMetaList => {
          return forkJoin([
            of(recordMetaList.map(recordMeta => recordMeta.path)),
            this.localStorage.getRawRecords(recordMetaList),
            of(recordMetaList),
          ]);
        }),
        map(([filenames, rawRecords, recordMetaList]) => {
          const cachedFiles: CachedFile[] = [];
          filenames.map((filename, idx) => cachedFiles.push({
            filename,
            type: 'json',
            content: rawRecords[idx],
            hash: recordMetaList[idx].hash,
            transactionHash: recordMetaList[idx].transactionHash,
          }));
          return cachedFiles;
        })
      );
  }

  private createVerificationJson(cachedFiles: CachedFile[]): CachedFile {
    const verification = {};
    cachedFiles.forEach(cachedFile => {
      verification[cachedFile.filename] = (cachedFile.transactionHash) ? cachedFile.transactionHash : '';
    });
    const verificationJson: CachedFile = {
      filename: 'verification.json',
      type: 'json',
      content: JSON.stringify(verification),
    };
    return verificationJson;
  }

  private createZip(cachedFiles: CachedFile[]): Observable<Blob> {
    const zip = new JSZip();
    const verificationJson = this.createVerificationJson(cachedFiles);
    cachedFiles.push(verificationJson);
    cachedFiles.forEach(cachedFile => {
      zip.file(cachedFile.filename, cachedFile.content);
    });
    return defer(() => zip.generateAsync({ type: 'blob' }));
  }

  private postArchive(blob: Blob) {
    const hostUrl = {
      LOCAL: 'http://127.0.0.1:8000',
      DEV: 'https://logboard-dev.numbersprotocol.io',
      PROD: 'https://mylog14.numbersprotocol.io',
    } ;
    const endpoint = '/api/v1/archives/';
    const formData = new FormData();
    formData.append('file', blob, 'mylog.zip');
    return this.dataStore.userData$
      .pipe(
        map(userData => (userData.uploadHost) ? userData.uploadHost : 'PROD'),
        map(hostType => hostUrl[hostType] + endpoint),
        switchMap(url => forkJoin([this.http.post(url, formData), of(url.replace(endpoint, ''))])),
        map(([res, host]: [string, string]) => res.replace(hostUrl.PROD, host)),
        tap(logboardUrl => this.generatedUrl.next(logboardUrl)),
        catchError(err => this.httpErrorHandler(err)),
      );
  }

  private httpErrorHandler(err: HttpErrorResponse) {
    return throwError(err.message || 'server error');
  }

  uploadZip() {
    return this.createCachedFiles()
      .pipe(
        switchMap(cachedFiles => this.createZip(cachedFiles)),
        switchMap(blob => this.postArchive(blob)),
      );
  }

  clearUrl() {
    this.generatedUrl.next('');
  }

}
