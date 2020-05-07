import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Observable, of, concat, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, takeUntil } from 'rxjs/operators';
import { Record } from '../../interfaces/record';
import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';
import { TranslateService } from '@ngx-translate/core';

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
  localError:string;
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

    // const url = this.geocodeBaseUrl + this.photo.locationStamp.latitude + ',' + this.photo.locationStamp.longitude + this.geocodePostfix;
    const url = this.OSMgeocodeBaseUrl + this.photo.locationStamp.latitude + ',' + this.photo.locationStamp.longitude + this.OSMgeocodePostfix;
    this.address$ = this.httpClient.get(url)
      .pipe(
        // map((res: GeocodingResponse) => res.results[0]),
        // tap(() => console.log("res")),
        // tap((res) => console.log("res2", res)),
        // tap((res: GeocodingResponse) => console.log("res4", res[0])),
        // tap(() => console.log("res3", this.address$)),
        // map((res: GeocodingResponse) => res.results[0].formatted_address),
        map((res: GeocodingResponse) => res[0].address.state + "," + res[0].address.suburb),
        // map((res: GeocodingResponse) => res[0].display_name),
        tap(() => console.log("res", this.address$)),
        // catchError(() => of(this.localError)),
        catchError(() => of('無法取得地址資訊')),
      );
  }

 

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    // return this.popoverCtrl.dismiss();
    return this.popoverCtrl.dismiss().then(() => {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    })
  }

  confirm() {
    console.log(this.record);
    concat(
      this.photoService.deletePhoto(this.record, this.photo),
      this.popoverCtrl.dismiss().then(() => {
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      })
    ).pipe(
        takeUntil(this.destroy$),
      ).subscribe();
  }

}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface GeocodingResult {
  // formatted_address?: string;
  // address_components?: string;
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
