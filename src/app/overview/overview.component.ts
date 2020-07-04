import { Component, OnInit } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { RecordRenderService } from '@core/services/record-render.service';
import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})

export class OverviewComponent implements OnInit {

  dailySummaries$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => this.recordRenderService.createDailySummaries(recordsByDate)),
      tap(e => console.log(e)),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly recordRenderService: RecordRenderService,
  ) {
  }

  ngOnInit() {
    // FIXME: debug line
    this.dataStore.recordsByDate$.subscribe(e => console.log('RecordsByDate', e));
  }

}
