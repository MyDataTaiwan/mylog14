import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding, FileWriteResult } from '@capacitor/core';
import { defer, from, Observable, of } from 'rxjs';
import { take, map, filter, defaultIfEmpty, switchMap, tap } from 'rxjs/operators';
import { crypto, util } from 'openpgp';

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
      directory: FilesystemDirectory.Data,
    }))
      .pipe(
        take(1),
          map(result => (util.encode_utf8(result.data))),
          switchMap(ab => crypto.hash.sha256(ab)),
          map((intArr: Uint8Array) => util.Uint8Array_to_hex(intArr)),
      );
  }

  getJsonData(fileName: string, dir = FilesystemDirectory.Data): Observable<any> {
    const readFile$ = defer(() => from(Filesystem.readFile({
      encoding: this.defaultEncoding,
      path: fileName,
      directory: dir,
    })));
    return readFile$
      .pipe(
        map(readResult => readResult.data),
        filter(data => data != null),
        defaultIfEmpty('{}'),
        map(data => JSON.parse(data)),
      );
  }

  saveJsonData<T extends Data>(data: T, dir = FilesystemDirectory.Data): Observable<string> {
    const fileName = (data.timestamp) ? `${data.timestamp}.json` : `${Date.now()}.json`;
    const writeFile$ = defer(() => from(Filesystem.writeFile({
        encoding: this.defaultEncoding,
        path: fileName,
        data: JSON.stringify(data),
        directory: dir,
      })));
    return writeFile$.pipe(map(() => fileName));
  }

}

interface Data {
  timestamp: number | string;
}
