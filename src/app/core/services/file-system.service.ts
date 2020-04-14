import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding, FileWriteResult } from '@capacitor/core';
import { defer, from, Observable, of } from 'rxjs';
import { take, map, filter, defaultIfEmpty } from 'rxjs/operators';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  defaultEncoding = FilesystemEncoding.UTF8;
  constructor() { }

  getFileHash(fileName: string, dir = FilesystemDirectory.Data): Observable<any> {
    return of('Hash unimplemented');
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
