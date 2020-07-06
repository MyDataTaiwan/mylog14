import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {
  date$: Observable<string> = this.activatedRoute.paramMap
    .pipe(
      map(params => params.get('date')),
    );
  selected = 0;
  recordsIcons = ['../../assets/ui/sort_3.svg', '../../assets/ui/sort_3_B.svg'];
  photosIcons = ['../../assets/ui/sort_1.svg', '../../assets/ui/sort_1_B.svg'];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() { }

  toggle(value: number) {
    this.selected = value;
  }

}
