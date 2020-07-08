import { Component, OnInit } from '@angular/core';

import { RecordRenderService } from '@core/services/record-render.service';
import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})

export class OverviewComponent implements OnInit {

  dailySummaries$ = this.dataStore.dailySummaries$;

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly recordRenderService: RecordRenderService,
  ) {
  }

  ngOnInit() { }

}
