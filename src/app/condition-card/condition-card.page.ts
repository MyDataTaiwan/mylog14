import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-condition-card',
  templateUrl: './condition-card.page.html',
  styleUrls: ['./condition-card.page.scss'],
})
export class ConditionCardPage implements OnInit {
  defaultColor = 'danger';
  constructor() { }
  ngOnInit() {
  }

  segmentChanged(event: any) {
    console.log(event.target.value);
    this.defaultColor = (event.target.value) ? 'warning' : 'success';
  }

}
