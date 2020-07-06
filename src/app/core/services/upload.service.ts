import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { BehaviorSubject, defer, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { CachedFile } from '../interfaces/cached-file';
import { RecordRepositoryService } from './repository/record-repository.service';
import { UserDataRepositoryService } from './repository/user-data-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly generatedUrl = new BehaviorSubject<string>('');
  public generatedUrl$ = this.generatedUrl.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly recordRepo: RecordRepositoryService,
    private readonly userDataRepo: UserDataRepositoryService,
  ) { }

  private createCachedFiles() {
    return of([]);
    /*
    return this.dataStore.metas$
      .pipe(
        take(1),
        map(metas => {
          const now = Date.now();
          const earliestTimeForUpload = now - 1000 * 86400 * 14; // Only upload  data in 14 Days
          return metas.filter(meta => meta.timestamp > earliestTimeForUpload);
        }),
        switchMap(metas => {
          return forkJoin([
            of(metas.map(meta => meta.path)),
            this.recordRepo.getJsonAll(metas),
            of(metas),
          ]);
        }),
        map(([filenames, rawRecords, metas]) => {
          const cachedFiles: CachedFile[] = [];
          filenames.map((filename, idx) => cachedFiles.push({
            filename,
            type: 'json',
            content: rawRecords[idx],
            hash: metas[idx].hash,
            transactionHash: metas[idx].transactionHash,
          }));
          return cachedFiles;
        })
      );
      */
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
