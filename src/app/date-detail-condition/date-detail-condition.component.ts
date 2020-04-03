import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-detail-condition',
  templateUrl: './date-detail-condition.component.html',
  styleUrls: ['./date-detail-condition.component.scss'],
})
export class DateDetailConditionComponent implements OnInit {
  data = {
    cough: {
      isShow: true,
      detail: '5分鐘咳了10次左右'
    },
    fever: {
      isShow: false,
      detail: '5分鐘咳了10次左右'

    },
    runnyNose: {
      isShow: false,
      detail: '5分鐘咳了10次左右'

    },
    stuffyNose: {
      isShow: true,
      detail: '有點嗅覺失靈'

    }
  };
  cough = false;
  fever = false;
  runnyNose = false;
  stuffyNose = false;
  constructor() { }

  ngOnInit() {
  }

}
