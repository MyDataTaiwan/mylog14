import { FileSystemService } from '../storage/file-system.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { Meta } from '../../interfaces/meta';
import { Record } from '../../classes/record';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordRepositoryService {
  RECORD_META_KEY = 'records';

  constructor(
    private readonly fileSystem: FileSystemService,
    private readonly localStorage: LocalStorageService,
  ) { }

  get(meta: Meta): Observable<Record> {
    return this.fileSystem.getJsonData(meta.path);
  }

  getAll(): Observable<Record[]> {
    return this.getMetas()
      .pipe(
        switchMap(metas => forkJoin(metas.map(meta => this.get(meta))))
      );
  }

  getJson(meta: Meta): Observable<string> {
    return this.fileSystem.getJsonData(meta.path, false);
  }

  getJsonAll(): Observable<string[]> {
    return this.getMetas()
      .pipe(
        switchMap(metas => forkJoin(metas.map(meta => this.getJson(meta))))
      );
  }

  save(record: Record): Observable<Record[]> {
    return forkJoin([this.getMetas(), this.saveRecordAndCreateMeta(record)])
      .pipe(
        switchMap(([metas, meta]) => this.saveMetas([...metas, meta])),
        switchMap(() => this.getAll()),
      );
  }

  private createMetaFromPath(timestamp: number, path: string): Observable<Meta> {
    return this.fileSystem.getFileHash(path)
      .pipe(
        map(hash => ({ timestamp, path, hash }) as Meta),
      );
  }

  private saveRecordAndCreateMeta(record: Record): Observable<Meta> {
    return this.fileSystem.saveJsonData(record)
      .pipe(
        switchMap(filename => this.createMetaFromPath(record.timestamp, filename)),
      );
  }

  private getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.RECORD_META_KEY, []);
  }

  private saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.RECORD_META_KEY);
  }

}
