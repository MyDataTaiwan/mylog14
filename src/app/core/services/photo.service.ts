import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CameraOptions, CameraPhoto, CameraResultType, CameraSource, PermissionResult,
  PermissionsOptions, PermissionType, Plugins,
} from '@capacitor/core';

const { Camera, Permissions } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  create(): Observable<string> {
    return this.getCameraPhoto()
      .pipe(
        map(cameraPhoto => cameraPhoto.base64String),
      );
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
