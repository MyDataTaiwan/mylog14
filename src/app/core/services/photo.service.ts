import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CameraOptions, CameraPhoto, CameraResultType, CameraSource, PermissionResult,
  PermissionsOptions, PermissionType, Plugins,
} from '@capacitor/core';

import { Photo } from '../classes/photo';
import { ProofService } from './proof.service';
import { PhotoRepositoryService } from './repository/photo-repository.service';

const { Camera, Permissions } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private readonly photoRepo: PhotoRepositoryService,
    private readonly proofService: ProofService,
  ) {
  }

  attachProof(photo: Photo): Observable<Photo> {
    return this.proofService.createProof()
      .pipe(
        map(proof => {
          photo.setProof(proof);
          return photo;
        }),
      );
  }


  create(): Observable<Photo> {
    return this.getCameraPhoto()
      .pipe(
        map(cameraPhoto => new Photo(Date.now(), cameraPhoto.base64String)),
      );
  }

  delete(photo: Photo): Observable<any> {
    return this.photoRepo.delete(photo);
  }

  save(record: Photo): Observable<Photo[]> {
    return this.photoRepo.save(record);
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
