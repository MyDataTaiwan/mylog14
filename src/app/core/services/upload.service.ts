import { Injectable } from '@angular/core';
import { FileSystemService } from './file-system.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as JSZip from 'jszip';
import { defer, from, forkJoin, of, BehaviorSubject, concat, Observable, throwError } from 'rxjs';
import { DataStoreService } from './data-store.service';
import { map, switchMap, take, tap, delay, catchError, timeout } from 'rxjs/operators';
import { CachedFile } from '../interfaces/cached-file';
import { runTransaction } from '@numbersprotocol/niota';

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
    private fileSystem: FileSystemService,
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
          }));
          return cachedFiles;
        })
      );
  }

  private createVerificationJson(cachedFiles: CachedFile[]) {
    return forkJoin(cachedFiles.map((cachedFile, idx) => {
      return this.registerOnLedger(cachedFile.hash)
        .pipe(delay(idx * 50));
    }))
      .pipe(
        map(ledgerHashes => {
          console.log('ledger Hashes', ledgerHashes);
          const verification = {};
          cachedFiles.forEach((cachedFile, idx) => {
            verification[cachedFile.filename] = ledgerHashes[idx];
          });
          return verification;
        }),
        map(verification => {
          const verificationJson: CachedFile = {
            filename: 'verification.json',
            type: 'json',
            content: JSON.stringify(verification),
          };
          return verificationJson;
        })
      );
  }

  private createZip(cachedFiles: CachedFile[]) {
    return this.createVerificationJson(cachedFiles)
      .pipe(
        map(verificationJson => {
          const zip = new JSZip();
          cachedFiles.push(verificationJson);
          cachedFiles.forEach(cachedFile => {
            zip.file(cachedFile.filename, cachedFile.content);
          });
          return zip;
        }),
        switchMap(zip => zip.generateAsync({ type: 'blob' })),
      );
  }

  private postArchive(blob: Blob) {
    const tmpUrl = 'http://127.0.0.1:8000/api/v1/archives/';
    const url = 'https://mylog14.numbersprotocol.io/api/v1/archives/';
    const formData = new FormData();
    formData.append('file', blob, 'test.zip');
    return this.http.post(url, formData)
      .pipe(
        tap((res: string) => this.generatedUrl.next(res)),
        catchError(err => this.httpErrorHandler(err)),
      );
  }

  private httpErrorHandler(err: HttpErrorResponse) {
    return throwError(err.message || 'server error');
  }

  private registerOnLedger(hash: string): Observable<any> {
    const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
    const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    const rawMsg = { hash };
    return from(runTransaction(address, seed, rawMsg))
      .pipe(
        timeout(10000),
        tap(resultHash => console.log(`Hash ${resultHash} registered on ledger`, resultHash)),
        catchError(err => {
          console.log(err);
          return of('');
        })
      );
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
