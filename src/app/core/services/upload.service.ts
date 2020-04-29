import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as JSZip from 'jszip';
import { defer, from, forkJoin, of, BehaviorSubject, concat, Observable, throwError } from 'rxjs';
import { DataStoreService } from './data-store.service';
import { map, switchMap, take, tap, delay, catchError, timeout } from 'rxjs/operators';
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
    const tmpUrl = 'http://127.0.0.1:8000/api/v1/archives/';
    const url = 'https://mylog14.numbersprotocol.io/api/v1/archives/';
    const formData = new FormData();
    formData.append('file', blob, 'beta1.zip');
    return this.http.post(url, formData)
      .pipe(
        tap((res: string) => this.generatedUrl.next(res)),
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
