import { Component, OnInit } from '@angular/core';

import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})

export class OverviewComponent implements OnInit {

  summaryByDate$ = this.dataStore.summaryByDate$;

  constructor(
    private readonly dataStore: DataStoreService,
  ) {
  }

  ngOnInit() { }

}
