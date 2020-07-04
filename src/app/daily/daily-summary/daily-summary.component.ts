import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { RecordRenderService } from '@core/services/record-render.service';
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
  isShowMap = false;
  dailySummary$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => this.recordRenderService.createDailySummary(0, this.date, recordsByDate[this.date])),
    );

  proofs$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => recordsByDate[this.date]),
      map(records => records.map(record => record.proof)),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly recordRenderService: RecordRenderService,
  ) { }

  ngOnInit() {
  }

  onClickOutside() {
    if (this.selectedSymptoms) {
      this.selectedSymptoms = !this.selectedSymptoms;
    }
  }

}
