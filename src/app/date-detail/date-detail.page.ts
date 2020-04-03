import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.page.html',
  styleUrls: ['./date-detail.page.scss'],
})
export class DateDetailPage implements OnInit {
  selectedSegment = true;
  constructor() { }

  ngOnInit() {
  }

  onSegmentChanged(data) {
    this.selectedSegment = data;
  }

}
