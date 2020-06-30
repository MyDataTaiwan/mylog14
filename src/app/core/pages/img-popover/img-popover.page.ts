import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Photo } from '../../interfaces/old-photo';
import { Record } from '../../interfaces/record';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-img-popover',
  templateUrl: './img-popover.page.html',
  styleUrls: ['./img-popover.page.scss'],
})
export class ImgPopoverPage implements OnInit {

  @Input() record: Record;
  @Input() photo: Photo;
  address$: Observable<string>;

  constructor(
    private popoverCtrl: PopoverController,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.address$ = this.geolocationService.getFromLocation(this.photo.locationStamp.latitude, this.photo.locationStamp.longitude);
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