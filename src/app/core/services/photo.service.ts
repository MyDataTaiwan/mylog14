import { Injectable } from '@angular/core';
import { Capacitor, Plugins, CameraResultType, CameraSource, FilesystemDirectory, CameraPhoto } from '@capacitor/core';
import { formatDate } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Subject, Observable, from, BehaviorSubject, defer, forkJoin, of, concat } from 'rxjs';
import { Snapshot } from '../interfaces/snapshot';
import { map, tap, switchMap, take, catchError } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';
import { DataStoreService } from './data-store.service';
import { Record } from '../interfaces/record';
import { LocalStorageService } from './local-storage.service';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private photosSubject = new BehaviorSubject<Photo[]>([]);
  public readonly photos$ = this.photosSubject.asObservable();
  private platform: Platform;
  private PHOTO_STORAGE = 'photos';
  constructor(
    private dataStore: DataStoreService,
    private localStorage: LocalStorageService,
    platform: Platform,
  ) {
    this.platform = platform;
    this.loadSaved();
  }

  startCapture(takePhotoSignal$: Subject<any>): Observable<CameraPhoto> {
    return from(Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    }))
      .pipe(
        map(res => {
          takePhotoSignal$.next();
          takePhotoSignal$.complete();
          return res;
        })
      );
  }

  async createPicture(capturedPhoto: CameraPhoto, snapshot?: Snapshot) {
    const savedImageFile = await this.savePicture(capturedPhoto, snapshot);

    // Add new photo to Photos array
    this.photos.unshift(savedImageFile);
    this.photosSubject.next(this.photos);

    // Cache all photo data for future retrieval
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: this.platform.is('hybrid')
        ? JSON.stringify(this.photos)
        : JSON.stringify(this.photos.map(p => {
          // Don't save the base64 representation of the photo data,
          // since it's already saved on the Filesystem
          const photoCopy = { ...p };
          delete photoCopy.byteString;
        }))
    });
    // const photoBase64 = await this.readAsBase64(capturedPhoto);
    return {
      photo: savedImageFile,
      metadata: snapshot,
    };
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || [];
    this.photos = this.photos.filter(photo => {
      return photo != null;
    });

    // If running on the web...
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (const photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data
        });

        // Web platform only: Save the photo into the base64 field
        photo.byteString = `data:image/jpeg;base64,${readFile.data}`;
      }
    }

    this.photosSubject.next(this.photos);
    return this.photos;
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: CameraPhoto, snapshot?: Snapshot) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = `${Date.now()}.jpg`;
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Get platform-specific photo filepaths
    const photo = await this.getPhotoFile(cameraPhoto, fileName);
    if (snapshot !== undefined) {
      photo.timestamp = snapshot.timestamp;
      photo.locationStamp = snapshot.locationStamp;
    }
    return photo;
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Retrieve the photo metadata based on the platform the app is running on
  private async getPhotoFile(cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> {
    let base64String = await this.readAsBase64(cameraPhoto);
    // Remove "data:image/jpeg;base64," data schema if is web
    base64String = (this.platform.is('hybrid')) ? base64String : base64String.split(',')[1];
    if (this.platform.is('hybrid')) {
      // Get the new, complete filepath of the photo saved on filesystem
      const fileUri = await Filesystem.getUri({
        directory: FilesystemDirectory.Data,
        path: fileName
      });

      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: fileUri.uri,
        webviewPath: Capacitor.convertFileSrc(fileUri.uri),
        byteString: base64String,
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's 
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
        byteString: base64String,
      };
    }
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: Photo, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    });
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  deletePhoto(record: Record, photo: Photo) {
    const idx = record.photos.findIndex(p => p.filepath === photo.filepath);
    record.photos.splice(idx);

    const tmpArr = photo.filepath.split('/');
    const filename = tmpArr[tmpArr.length - 1];
    const deleteFile$ = defer(() => Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data,
    }))
      .pipe(
        catchError(err => {
          console.log(err);
          return of();
        })
      );

    return this.dataStore.recordMetaList$
      .pipe(
        take(1),
        switchMap(recordMetaList => this.localStorage.saveRecord(record, recordMetaList)),
        switchMap(recordMetaList => this.dataStore.updateRecordMetaList(recordMetaList)),
        switchMap(_ => deleteFile$),
      );
  }
}
