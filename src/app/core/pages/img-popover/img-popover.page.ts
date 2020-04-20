import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-img-popover',
  templateUrl: './img-popover.page.html',
  styleUrls: ['./img-popover.page.scss'],
})
export class ImgPopoverPage implements OnInit {
  @Input() timestamp: number;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() webviewPath: string;
  address$: Observable<string>;
  geocodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  geocodePostfix = '&language=zh-TW&key=AIzaSyC8Yg8Ig6VEZIWz8cWH3yfYOjAGzqIpDMI'; // FIXME: Shouldn't expose the key
  constructor(
    private httpClient: HttpClient,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.address$ = this.httpClient.get(this.geocodeBaseUrl + this.latitude + ',' + this.longitude + this.geocodePostfix)
      .pipe(
        map((res: GeocodingResponse) => res.results[0].formatted_address),
        catchError(() => of('無法取得地址資訊')),
      );
  }

  cancel() {
    return this.popoverCtrl.dismiss();
  }

  confirm() {
    // Delete the photo here
    return this.popoverCtrl.dismiss();
  }

}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface GeocodingResult {
  formatted_address?: string;
}
