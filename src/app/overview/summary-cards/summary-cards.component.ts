import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { DailySummary } from '@core/interfaces/daily-summary';
import { PhotosByDate } from '@core/interfaces/photos-by-date';
import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
})
export class SummaryCardsComponent implements OnInit {
  @Input() dailySummaries: DailySummary[];

  photosByDate$ = this.dataStore.photosByDate$
    .pipe(
      map((photosByDate: PhotosByDate) => {
        Object.keys(photosByDate).forEach(key => {
          photosByDate[key] = photosByDate[key].reverse();
        });
        return photosByDate;
      })
    );

  constructor(
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {}

  getImgSrc(imgByteString?: string): string {
    return (imgByteString) ? 'data:image/jpeg;base64,' + imgByteString : '/assets/imgA.png';
  }

}
