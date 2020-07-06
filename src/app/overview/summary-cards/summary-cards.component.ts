import { Component, Input, OnInit } from '@angular/core';

import { DailySummary } from '@core/interfaces/daily-summary';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
})
export class SummaryCardsComponent implements OnInit {
  @Input() dailySummaries: DailySummary[];

  constructor() { }

  ngOnInit() {}

  getImgSrc(imgByteString?: string): string {
    return (imgByteString) ? 'data:image/jpeg;base64,' + imgByteString : '/assets/imgA.png';
  }

}
