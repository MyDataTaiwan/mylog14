import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {
  isShow:true;
list=[
  {
    date:"2020/03/28",
    day:1,
    isShhow:true,
    location:[
      {
        latitude:25.060018,
        longitude:121.5307651,
        time:'09:11'
      },{
        latitude:25.060018,
        longitude:121.5307651,
        time:'09:11'
      }
    ]
  },
   {
    date:"2020/03/29",
    day:2,
    isShhow:true,
    location:[
      {
        latitude:25.060018,
        longitude:121.5307651,
        time:'09:11'
      },{
        latitude:25.060018,
        longitude:121.5307651,
        time:'09:11'
      }
    ]
  },  {
    date:"2020/03/30",
    day:3,
    isShhow:true,
    location:[
      {
        latitude:25.060018,
        longitude:121.5307651,
        time:'09:11'
      },{
        latitude:25.060018,
        longitude:121.5307651,
        time:'09:11'
      }
    ]
  },
]
arry=[this.list[0],this.list[1],this.list[2],];
  num = ["1", "2", 3, 4, 5, 6, 7];
  days = [5, 4, 3, 2, 1];
  constructor() { }

  ngOnInit() {
  }

}
// location
// longitude
// latitude