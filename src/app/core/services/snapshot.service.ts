import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { LocationStamp } from '../interfaces/location-stamp';
import { Snapshot } from '../interfaces/snapshot';
import { PhotoService } from './photo.service';
import { Record } from '../interfaces/record';
import { RecordService } from './record.service';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {

  constructor(
    private geolocationService: GeolocationService,
    private photoService: PhotoService,
    private recordService: RecordService,
  ) { }

  async getLocationStamp(): Promise<LocationStamp> {
    const pos = await this.geolocationService.getCurrentPosition();
    return Promise.resolve({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
    });
  }

  getTimestamp(): number {
    return Date.now();
  }

  async createSnapshot(): Promise<Snapshot> {
    const location = await this.getLocationStamp();
    return {
      timestamp: this.getTimestamp(),
      locationStamp: location,
    };
  }

  async createPhotoWithSnapshot(): Promise<Record> {
    const photoBase64 = await this.photoService.takePicture();
    const snap = await this.createSnapshot();
    return {
      snapshot: snap,
      photos: [
        {
          byteString: photoBase64,
        }
      ]
    };
  }

  async snapCapture(): Promise<void> {
    const record = await this.createPhotoWithSnapshot();
    return this.recordService.createRecord(record);
  }

}
