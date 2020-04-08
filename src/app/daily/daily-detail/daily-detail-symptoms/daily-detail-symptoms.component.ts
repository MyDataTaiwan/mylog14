import { Component, OnInit, Input } from '@angular/core';
import { DailyDetail } from '../daily-detail.page';

@Component({
  selector: 'app-daily-detail-symptoms',
  templateUrl: './daily-detail-symptoms.component.html',
  styleUrls: ['./daily-detail-symptoms.component.scss'],
})
export class DailyDetailSymptomsComponent implements OnInit {
  @Input() dailyDetail: DailyDetail;
  isShow = true;
  mockCoughDetail = '5分鐘咳了10次左右';
  mockFeverDetail = '';
  mockRunnyNoseDetail = '';
  mockStuffyNoseDetail = '有點嗅覺失靈';

  cough = false;
  fever = false;
  runnyNose = false;
  stuffyNose = false;
  constructor() { }

  ngOnInit() {
  }

}
