import { Injectable } from '@angular/core';
import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins, CameraOptions, PermissionsOptions, PermissionResult, PermissionType } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, defer, from, Observable, of, Subject, forkJoin } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';
import { Record } from '../interfaces/record';
import { Snapshot } from '../interfaces/snapshot';
import { DataStoreService } from './data-store.service';
import { RecordService } from './repository/record.service';
import { FileSystemService } from './storage/file-system.service';
import { Meta } from '../interfaces/meta';
import { LocalStorage } from 'openpgp';
import { LocalStorageService } from './storage/local-storage.service';

const { Camera, Filesystem, Storage, Permissions } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private photosSubject = new BehaviorSubject<Photo[]>([]);
  public readonly photos$ = this.photosSubject.asObservable();
  private platform: Platform;
  private PHOTO_STORAGE = 'photosd';

  PHOTO_META_REPOSITORY = 'photos';
  PHOTO_DIRECTORY = FilesystemDirectory.Data;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly fileSystem: FileSystemService,
    private readonly localStorage: LocalStorageService,
    platform: Platform,
  ) {
    this.platform = platform;
  }

  createPhotoByCamera(): Observable<Photo> {
    return this.getCameraPhoto()
      .pipe(
        map(cameraPhoto => ({ byteString: cameraPhoto.base64String })),
      );
  }

  getPhoto(meta: Meta): Observable<Photo> {
    return this.fileSystem.getJsonData(meta.path, meta.directory);
  }

  getPhotos(metas: Meta[]): Observable<Photo[]> {
    return forkJoin(
      metas.map(meta => this.getPhoto(meta)),
    );
  }

  getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.PHOTO_META_REPOSITORY, []);
  }

  saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.PHOTO_META_REPOSITORY);
  }

  private getCameraPhoto(): Observable<CameraPhoto> {
    const options: CameraOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    };
    return defer(() => Camera.getPhoto(options));
  }

  private queryCameraPermission(): Observable<PermissionResult> {
    const options: PermissionsOptions = { name: PermissionType.Camera };
    return defer(() => Permissions.query(options));
  }

}
