import { Injectable } from '@angular/core';
import { FileSystemService } from './file-system.service';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as JSZip from 'jszip';
import { defer, from, forkJoin, of } from 'rxjs';
import { DataStoreService } from './data-store.service';
import { map, switchMap, take } from 'rxjs/operators';
import { CachedFile } from '../interfaces/cached-file';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

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
          ]);
        }),
        map(([filenames, rawRecords]) => {
          const cachedFiles: CachedFile[] = [];
          filenames.map((filename, idx) => cachedFiles.push({
            filename,
            type: 'json',
            content: rawRecords[idx],
          }));
          return cachedFiles;
        })
      );
  }

  private createVerificationJson(cachedFiles: CachedFile[]) {
    const verification = {};
    cachedFiles.forEach(cachedFile => {
      verification[cachedFile.filename] = '';
    });
    const verificationJson: CachedFile = {
      filename: 'verification.json',
      type: 'json',
      content: JSON.stringify(verification),
    };
    return verificationJson;
  }

  private createZip(cachedFiles: CachedFile[]) {
    const zip = new JSZip();
    cachedFiles.push(this.createVerificationJson(cachedFiles));
    cachedFiles.forEach(cachedFile => {
      zip.file(cachedFile.filename, cachedFile.content);
    });
    return defer(() => zip.generateAsync({ type: 'blob' }));
  }

  private postArchive(blob: Blob) {
    // const tmpUrl = 'http://127.0.0.1:8000/api/v1/archives/';
    const url = 'https://mylog14.numbersprotocol.io/api/v1/archives/';
    const formData = new FormData();
    formData.append('file', blob, 'test.zip');
    return this.http.post(url, formData);
  }

  uploadZip() {
    return this.createCachedFiles()
      .pipe(
        switchMap(cachedFiles => this.createZip(cachedFiles)),
        switchMap(blob => this.postArchive(blob)),
      );
  }

}
