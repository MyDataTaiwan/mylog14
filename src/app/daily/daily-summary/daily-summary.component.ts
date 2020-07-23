import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.scss'],
})
export class DailySummaryComponent implements OnInit {
  selectedSymptoms = false;
  @Input() date: string;
  mapStyles = {
    height: '100px',
  };

  proofs$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => recordsByDate[this.date]),
      map(records => (records) ? records.map(record => record.proof) : null),
    );

  dailySummary$ = this.dataStore.summaryByDate$
    .pipe(
      map(summaryByDate => summaryByDate[this.date]),
    );

  constructor(
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {
  }

  onClickOutside() {
    if (this.selectedSymptoms) {
      this.selectedSymptoms = !this.selectedSymptoms;
    }
  }

  getSummaryTranslation(summary) {
    console.log(summary);
    return summary;

  }

}
