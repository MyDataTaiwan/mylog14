import { FileSystemService } from '../storage/file-system.service';
import { FilesystemDirectory } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { Meta } from '../../interfaces/meta';
import { Record } from '../../classes/record';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordRepositoryService {
  RECORD_META_KEY = 'records';
  RECORD_DIRECTORY = FilesystemDirectory.Data;

  constructor(
    private readonly fileSystem: FileSystemService,
    private readonly localStorage: LocalStorageService,
  ) { }

  getRecord(meta: Meta): Observable<Record> {
    return this.fileSystem.getJsonData(meta.path, meta.directory);
  }

  getRecords(metas: Meta[]): Observable<Record[]> {
    return forkJoin(
      metas.map(meta => this.getRecord(meta)),
    );
  }

  getRawRecords(metas: Meta[]): Observable<string[]> {
    return forkJoin(
      metas.map(meta => this.fileSystem.getJsonData(meta.path, meta.directory, false)),
    );
  }

saveRecord(record: Record): Observable<Meta> {
  return this.fileSystem.saveJsonData(record)
    .pipe(
      switchMap(filename => this.fileSystem.getFileHash(filename)
        .pipe(
          map(fileHash => [filename, fileHash]),
        )
      ),
      map(([filename, fileHash]) => {
        return {
          timestamp: record.timestamp,
          path: filename,
          directory: this.RECORD_DIRECTORY,
          hash: fileHash,
        } as Meta;
      }),
    );
}

  getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.RECORD_META_KEY, []);
  }

  saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.RECORD_META_KEY);
  }

}
