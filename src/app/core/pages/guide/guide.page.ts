import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateConfigService } from 'src/app/core/services/translate-config.service';
import { UserData } from '../../interfaces/user-data';
import { DataStoreService } from '../../services/data-store.service';

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
    private dataStore: DataStoreService,
    private router: Router,
    private modalCtrl: ModalController,
    public translateConfig: TranslateConfigService,
  ) { }

  moveToNext(slides) {
    console.log(slides);
    slides.slideNext();
  }
  onClick() {
    this.dataStore.updateUserData({
      firstName: '',
      lastName: '',
      newUser: false,
      eulaAccepted: false,
      guideAccepted: false
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, err => console.log(err));
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  onStarted() {
    this.userData.guideAccepted = true;
    this.modalCtrl.dismiss(this.userData);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
