import { FilesystemDirectory, FilesystemEncoding, Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { crypto, util } from 'openpgp';
import { defaultIfEmpty, filter, map, switchMap, take } from 'rxjs/operators';
import { defer, from, Observable } from 'rxjs';

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
        take(1),
        map(result => (util.encode_utf8(result.data))),
        switchMap(ab => crypto.hash.sha256(ab)),
        map((intArr: Uint8Array) => util.Uint8Array_to_hex(intArr)),
      );
  }

  getJsonData(fileName: string, dir = FilesystemDirectory.Data, parse = true): Observable<any> {
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
        map(data => parse ? JSON.parse(data) : data),
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
