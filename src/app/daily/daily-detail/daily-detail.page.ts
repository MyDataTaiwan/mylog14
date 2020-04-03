import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.page.html',
  styleUrls: ['./daily-detail.page.scss'],
})
export class DailyDetailPage implements OnInit {
  selectedSegment = true;
  constructor() { }

  ngOnInit() {
  }
  
  onSegmentChanged(data) {
    this.selectedSegment = data;
  }

}
