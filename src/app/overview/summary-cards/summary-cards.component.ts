import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
})
export class SummaryCardsComponent implements OnInit {
  summaryByDate$ = this.dataStore.summaryByDate$;

  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  constructor(
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {}

}
