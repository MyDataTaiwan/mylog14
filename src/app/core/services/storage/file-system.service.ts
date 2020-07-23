import { Injectable } from '@angular/core';

import { crypto, util } from 'openpgp';
import { defer, from, Observable, of } from 'rxjs';
import {
  catchError, defaultIfEmpty, filter, map, switchMap,
} from 'rxjs/operators';

import {
  FilesystemDirectory, FilesystemEncoding, Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  defaultEncoding = FilesystemEncoding.UTF8;
  constructor() { }

  getFileHash(fileName: string, dir = FilesystemDirectory.Data): Observable<any> {
    return from(Filesystem.readFile({
      path: fileName,
      directory: dir,
    }))
      .pipe(

        map(result => (util.encode_utf8(result.data))),
        switchMap(ab => crypto.hash.sha256(ab)),
        map((intArr: Uint8Array) => util.Uint8Array_to_hex(intArr)),
      );
  }

  deleteJsonData(filename: string, dir = FilesystemDirectory.Data): Observable<any> {
    return defer(() => from(Filesystem.deleteFile({
      path: filename,
      directory: dir,
    })));
  }

  getJsonData(filename: string, parse = true, dir = FilesystemDirectory.Data): Observable<any> {
    const readFile$ = defer(() => from(Filesystem.readFile({
      encoding: this.defaultEncoding,
      path: filename,
      directory: dir,
    })));
    return readFile$
      .pipe(
        catchError(() => of({ data: null })),
        map(readResult => readResult.data),
        filter(data => data != null),
        defaultIfEmpty('{}'),
        map(data => parse ? JSON.parse(data) : data),
      );
  }

  saveJsonData<T extends Data>(data: T, dir = FilesystemDirectory.Data): Observable<string> {
    const filename = (data.timestamp) ? `${data.timestamp}.json` : `${Date.now()}.json`;
    const writeFile$ = defer(() => from(Filesystem.writeFile({
      encoding: this.defaultEncoding,
      path: filename,
      data: JSON.stringify(data),
      directory: dir,
    })));
    return writeFile$.pipe(map(() => filename));
  }

}

interface Data {
  timestamp: number | string;
}
