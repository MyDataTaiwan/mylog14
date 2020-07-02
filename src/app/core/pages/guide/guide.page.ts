import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { TranslateConfigService } from 'src/app/core/services/translate-config.service';
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage {
  destroy$ = new Subject();
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    autoplay: true

  };
  @Input() userData: UserData;
  constructor(
    private modalCtrl: ModalController,
    public translateConfig: TranslateConfigService,
  ) { }

  moveToNext(slides) {
    console.log(slides);
    slides.slideNext();
  }
  onClick() {
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  onStarted() {
    this.modalCtrl.dismiss(this.userData);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
