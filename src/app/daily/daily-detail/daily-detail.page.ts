import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.page.html',
  styleUrls: ['./daily-detail.page.scss'],
})
export class DailyDetailPage implements OnInit {
  dayCount$: Observable<number>;
  selectedSegment = true;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.dayCount$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('day')),
      map(day => +day),
    );
  }

  onSegmentChanged(data) {
    this.selectedSegment = data;
  }

}
