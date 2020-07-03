import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.page.html',
  styleUrls: ['./daily-detail.page.scss'],
})
export class DailyDetailPage implements OnInit {
  dayCount$: Observable<number>;
  selectedSegment = true;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.dayCount$ = this.activatedRoute.paramMap.pipe(
      map(params => +params.get('day')),
    );
  }

  onSegmentChanged(data) {
    this.selectedSegment = data;
  }

}
