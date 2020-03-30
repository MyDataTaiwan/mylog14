import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.page.html',
  styleUrls: ['./date-detail.page.scss'],
})
export class DateDetailPage implements OnInit {
  selectedSegment = 'condition';
  constructor() { }

  ngOnInit() {
  }

  onSegmentChanged(event) {
    this.selectedSegment = event.target.value;
  }

}
