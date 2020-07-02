import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { defer, forkJoin, from, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ImgPopoverPage } from 'src/app/core/pages/img-popover/img-popover.page';
import { Photo } from '../../interfaces/photo';
import { Record } from '../../classes/record';

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
    private popoverController: PopoverController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async openImageModal(photo: Photo) {
    const modal = await this.popoverController.create({
      component: ImgPopoverPage,
      translucent: true,
      componentProps: { photo }
    });
    return await modal.present();
  }

  createImageDeletePopover(record: Record, photo: Photo): Observable<HTMLIonPopoverElement> {
    return defer(() => this.popoverController.create({
      component: ImgPopoverPage,
      componentProps: { record, photo }
    }));
  }

  showImageDeletePopover(photo: Photo, record: Record) {
    this.createImageDeletePopover(record, photo)
      .pipe(
        switchMap(popover => forkJoin([
          popover.present(),
          this.propagateDeleteOnDismiss(popover),
        ])),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { }, e => console.log(e));
  }

  // Propagate the popover 'delete' dismiss data to modal dismiss
  propagateDeleteOnDismiss(popover: HTMLIonPopoverElement) {
    return from(popover.onWillDismiss())
      .pipe(
        map(res => res.data.delete),
        switchMap(willDelete => this.modalCtrl.dismiss({ delete: willDelete })),
      );
  }

  deleteImage() {
    this.showImageDeletePopover(this.photo, this.record);
  }

  cancel() {
    this.modalCtrl.dismiss({
      delete: false
    });
  }
}