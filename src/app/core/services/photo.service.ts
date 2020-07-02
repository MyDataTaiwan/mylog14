import { Injectable } from '@angular/core';
import { CameraPhoto, CameraResultType, CameraSource, Plugins, CameraOptions, PermissionsOptions, PermissionResult, PermissionType } from '@capacitor/core';
import { defer, from, Observable, of, Subject, forkJoin } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';
import { FileSystemService } from './storage/file-system.service';
import { Meta } from '../interfaces/meta';
import { LocalStorageService } from './storage/local-storage.service';

const { Camera, Permissions } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  PHOTO_META_KEY = 'photos';

  constructor(
    private readonly fileSystem: FileSystemService,
    private readonly localStorage: LocalStorageService,
  ) {
  }

  createPhotoByCamera(): Observable<Photo> {
    return this.getCameraPhoto()
      .pipe(
        map(cameraPhoto => ({ byteString: cameraPhoto.base64String })),
      );
  }

  getPhoto(meta: Meta): Observable<Photo> {
    return this.fileSystem.getJsonData(meta.path);
  }

  getPhotos(metas: Meta[]): Observable<Photo[]> {
    return forkJoin(
      metas.map(meta => this.getPhoto(meta)),
    );
  }

  getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.PHOTO_META_KEY, []);
  }

  saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.PHOTO_META_KEY);
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
