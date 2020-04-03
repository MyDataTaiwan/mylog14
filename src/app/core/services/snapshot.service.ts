import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { LocationStamp } from '../../interfaces/location-stamp';
import { Snapshot } from '../../interfaces/snapshot';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {

  constructor(
    private geolocation: GeolocationService,
  ) { }

  async getLocationStamp(): Promise<LocationStamp> {
    const pos = await this.geolocation.getCurrentPosition();
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
    return Promise.resolve({
      timestamp: this.getTimestamp(),
      locationStamp: location,
    });
  }

}
