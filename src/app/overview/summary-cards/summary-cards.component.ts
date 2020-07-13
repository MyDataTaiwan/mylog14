import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { DailySummary } from '@core/interfaces/daily-summary';
import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
})
export class SummaryCardsComponent implements OnInit {
  summaryByDateArray$ = this.dataStore.summaryByDate$
    .pipe(
      map(summaryByDate => {
        let arr: SummaryByDateArrayElement[] = [];
        Object.keys(summaryByDate).forEach(key => {
          arr.push({ key, value: summaryByDate[key]});
        });
        arr = arr.sort((a, b) => +a.value.dayCount - +b.value.dayCount);
        return arr;
      })
    );

  keyDescOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  constructor(
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {}

}

interface SummaryByDateArrayElement {
  key: string;
  value: DailySummary;
}
