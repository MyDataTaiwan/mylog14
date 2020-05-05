import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Observable, of, concat, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, takeUntil } from 'rxjs/operators';
import { Record } from '../../interfaces/record';
import { Photo } from '../../interfaces/photo';
import { PhotoService } from '../../services/photo.service';
import { ImgPopoverPage } from 'src/app/core/pages/img-popover/img-popover.page';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.page.html',
  styleUrls: ['./img-viewer.page.scss'],
})
export class ImgViewerPage implements OnInit, OnDestroy {
  @Input() record: Record;
  @Input() photo: Photo;

  address$: Observable<string>;
  destroy$ = new Subject();

  constructor(
    private httpClient: HttpClient,
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async openImageModal( photo: Photo) {
    const modal = await this.popoverController.create({
      component: ImgPopoverPage,
      translucent: true,
      componentProps: {  photo }
    });
    return await modal.present();
  }

  // cancel() {
  //   return this.popoverController.dismiss();
  // }

  // confirm() {
  //   console.log(this.record);
  //   concat(
  //     this.photoService.deletePhoto(this.record, this.photo),
  //     this.popoverController.dismiss(),
  //   )
  //     .pipe(
  //       takeUntil(this.destroy$),
  //     )
  //     .subscribe();
  // }
  cancel() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
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
