import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Photo } from '../../interfaces/photo';
import { Record } from '../../interfaces/record';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-img-popover',
  templateUrl: './img-popover.page.html',
  styleUrls: ['./img-popover.page.scss'],
})
export class ImgPopoverPage implements OnInit, OnDestroy {
  @Input() record: Record;
  @Input() photo: Photo;
  address$: Observable<string>;
  destroy$ = new Subject();
  locationError: string;
  geocodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  geocodePostfix = '&language=zh-TW&key=AIzaSyC8Yg8Ig6VEZIWz8cWH3yfYOjAGzqIpDMI'; // FIXME: Shouldn't expose the key

  OSMgeocodeBaseUrl = 'https://nominatim.openstreetmap.org/?addressdetails=1&q=';
  OSMgeocodePostfix = '&format=json&limit=1'; // FIXME: Shouldn't expose the key
  constructor(
    private httpClient: HttpClient,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private photoService: PhotoService,
    private translateService: TranslateService,


  ) { }

  ngOnInit() {
    this.translateService.get('description.cannotGetLocation').subscribe(
      value => { this.locationError = value; }
    );
    const url = this.OSMgeocodeBaseUrl + this.photo.locationStamp.latitude + ',' + this.photo.locationStamp.longitude + this.OSMgeocodePostfix;
    this.address$ = this.httpClient.get(url)
      .pipe(
        map((res: GeocodingResponse) => res[0].address.state + "," + res[0].address.suburb),
        tap(() => console.log("res", this.address$)),
        catchError(() => of(this.locationError)),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    return this.popoverCtrl.dismiss({
      delete: false
    });
  }

  confirm() {
    return this.popoverCtrl.dismiss({
      delete: true
    });
  }

}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface GeocodingResult {
  address?: addr;
  display_name?: string;
}
interface addr {
  city?: string;
  commercial?: string;
  country?: string;
  country_code?: string;
  county?: string;
  state?: string;
}
