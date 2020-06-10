import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataStoreService } from '../../services/data-store.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private dataStore: DataStoreService,
    private router: Router,
  ) { }

  ngOnInit() {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
