import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable, of, concat, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, takeUntil } from 'rxjs/operators';
import { Record } from '../../interfaces/record';
import { Photo } from '../../interfaces/photo';
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
  geocodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  geocodePostfix = '&language=zh-TW&key=AIzaSyC8Yg8Ig6VEZIWz8cWH3yfYOjAGzqIpDMI'; // FIXME: Shouldn't expose the key
  constructor(
    private httpClient: HttpClient,
    private popoverCtrl: PopoverController,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    const url = this.geocodeBaseUrl + this.photo.locationStamp.latitude + ',' + this.photo.locationStamp.longitude + this.geocodePostfix;
    this.address$ = this.httpClient.get(url)
      .pipe(
        map((res: GeocodingResponse) => res.results[0].formatted_address),
        catchError(() => of('無法取得地址資訊')),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    return this.popoverCtrl.dismiss();
  }

  confirm() {
    console.log(this.record);
    concat(
      this.photoService.deletePhoto(this.record, this.photo),
      this.popoverCtrl.dismiss(),
    )
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface GeocodingResult {
  formatted_address?: string;
}
