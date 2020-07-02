import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Record } from '@core/classes/record';
import { Photo } from '@core/interfaces/photo';
import { GeolocationService } from '@core/services/geolocation.service';
import { PopoverController } from '@ionic/angular';

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
    this.address$ = this.geolocationService.getFromLocation(0, 0);
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