import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bt-detail',
  templateUrl: './bt-detail.page.html',
  styleUrls: ['./bt-detail.page.scss'],
})
export class BtDetailPage implements OnInit {

  constructor() { }
  days = [
    5, 4, 3, 2, 1
  ];
  ngOnInit() {
  }

}
