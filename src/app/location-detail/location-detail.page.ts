import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {
  isShow:true;
  num = ["1", "2", 3, 4, 5, 6, 7];
  days = [5, 4, 3, 2, 1];
  constructor() { }

  ngOnInit() {
  }

}
