import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily-detail-symptoms',
  templateUrl: './daily-detail-symptoms.component.html',
  styleUrls: ['./daily-detail-symptoms.component.scss'],
})
export class DailyDetailSymptomsComponent implements OnInit {
  @Input() dayCount: number;
  isTrue = true;
  constructor(
  ) { }

  ngOnInit() {
  }

}
