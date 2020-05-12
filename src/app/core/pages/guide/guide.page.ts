import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { IonSlides} from '@ionic/angular';

import { DataStoreService } from '../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {
  destroy$ = new Subject();
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private dataStore: DataStoreService,
    private router: Router,
    // private slides: IonSlides,
  ) { }
  ngOnInit() {
  }
  move(slides){
    console.log(slides)
    slides.slideNext(2)
    // this.slides.slideNext(slides);
}
  onClick() {
    this.dataStore.updateUserData({ newUser: false, eulaAccepted: false }).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.router.navigate(['/']);
    }, err => console.log(err));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
