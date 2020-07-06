import { Injectable } from '@angular/core';

import { forkJoin, Observable } from 'rxjs';
import { defaultIfEmpty, map, switchMap } from 'rxjs/operators';

import { Photo } from '@core/classes/photo';
import { Meta } from '@core/interfaces/meta';

import { LedgerService } from '../ledger.service';
import { FileSystemService } from '../storage/file-system.service';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoRepositoryService {

  PHOTO_META_KEY = 'photos';

  constructor(
    private readonly fileSystem: FileSystemService,
    private readonly ledger: LedgerService,
    private readonly localStorage: LocalStorageService,
  ) { }

  delete(photo: Photo): Observable<any> {
    return this.getMetaFromPhoto(photo)
      .pipe(
        switchMap(meta => forkJoin([this.getMetas(), this.deletePhotoFromFileSystem(meta)])),
        map(([metas, meta]) => this.removeMetaFromMetas(metas, meta)),
        switchMap(metas => this.saveMetas(metas)),
      );
  }

  get(meta: Meta): Observable<Photo> {
    return this.fileSystem.getJsonData(meta.path);
  }

  getAll(): Observable<Photo[]> {
    return this.getMetas()
      .pipe(
        switchMap(metas => forkJoin(metas.map(meta => this.get(meta)))),
        defaultIfEmpty([]),
      );
  }

  save(photo: Photo): Observable<Photo[]> {
    return this.savePhotoAndCreateMeta(photo)
      .pipe(
        switchMap(meta => forkJoin([this.getMetas(), this.attachTransactionHash(meta)])),
        switchMap(([metas, meta]) => this.saveMetas([...metas, meta])),
        switchMap(() => this.getAll()),
      );
  }

  private attachTransactionHash(meta: Meta): Observable<Meta> {
    return this.ledger.createTransactionHash(meta.hash)
      .pipe(
        map(transactionHash => ({ ...meta, transactionHash })),
      );
  }

  private createMetaFromPath(timestamp: number, path: string): Observable<Meta> {
    return this.fileSystem.getFileHash(path)
      .pipe(
        map(hash => ({ timestamp, path, hash }) as Meta),
      );
  }

  private deletePhotoFromFileSystem(meta: Meta): Observable<Meta> {
    return this.fileSystem.deleteJsonData(meta.path)
      .pipe(
        switchMap(() => this.deleteMeta(meta)),
        map(() => meta),
      );
  }

  private savePhotoAndCreateMeta(photo: Photo): Observable<Meta> {
    return this.fileSystem.saveJsonData(photo)
      .pipe(
        switchMap(filename => this.createMetaFromPath(photo.timestamp, filename)),
      );
  }

  private deleteMeta(meta: Meta): Observable<any> {
    return this.getMetas()
      .pipe(
        map(metas => this.removeMetaFromMetas(metas, meta)),
        switchMap(newMetas => this.saveMetas(newMetas)),
      );
  }

  private getMetaFromPhoto(photo: Photo) {
    return this.getMetas()
      .pipe(
        map(metas => metas.find(meta => meta.timestamp === photo.timestamp)),
      );
  }

  private getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.PHOTO_META_KEY, []);
  }

  private saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.PHOTO_META_KEY);
  }

  private removeMetaFromMetas(metas: Meta[], meta: Meta): Meta[] {
    const idx = metas.findIndex(el => el.path === meta.path);
    if (idx !== -1) {
      metas.splice(idx, 1);
    }
    return metas;
  }
}
