import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-detail-condition',
  templateUrl: './date-detail-condition.page.html',
  styleUrls: ['./date-detail-condition.page.scss'],
})
export class DateDetailConditionPage implements OnInit {
  cough = false;
  fever = false;
  runnyNose = false;
  stuffyNose = false;
  constructor() { }

  ngOnInit() {
  }

}
