import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
})
export class LocationDetailPage implements OnInit {
  isShow: true;
  isSelect: true;
  isSelectlist = [];
  tempLocation = '25.035221,121.557612'
  url='https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&z=16&output=embed&t=&q='+this.tempLocation;
  list = [
    {
      date: "2020/03/28",
      day: 1,
      isShhow: true,
      isSelect: false,
      location: [
        {
          latitude: 25.060018,
          longitude: 121.5307651,
          time: '09:11'
        }, {
          latitude: 25.060018,
          longitude: 121.5307651,
          time: '09:11'
        }
      ]
    },
    {
      date: "2020/03/29",
      day: 2,
      isShhow: true,
      isSelect: false,
      location: [
        {
          latitude: 25.060018,
          longitude: 121.5307651,
          time: '09:11'
        }, {
          latitude: 25.060018,
          longitude: 121.5307651,
          time: '09:11'
        }
      ]
    }, {
      date: "2020/03/30",
      day: 3,
      isShhow: true,
      isSelect: false,
      location: [
        {
          latitude: 25.060018,
          longitude: 121.5307651,
          time: '09:11'
        }, {
          latitude: 25.060018,
          longitude: 121.5307651,
          time: '09:11'
        }
      ]
    },
  ]
  arry = [this.list[0], this.list[1], this.list[2],];
  num = ["1", "2", 3, 4, 5, 6, 7];
  days = [5, 4, 3, 2, 1];
  constructor() { }

  ngOnInit() {
  }
  addSelect(data) {
    data.isSelect=!data.isSelect;
    this.isSelectlist.push(data);
    console.log("isSelectlist", this.isSelectlist)
  }
  delSelect(data) {
    data.isSelect=!data.isSelect;
    console.log("isSelectlist", this.isSelectlist)
    var index = this.isSelectlist.indexOf(data);
    if (index > - 1) {
      this.isSelectlist.splice(index, 1);
    }
    console.log("isSelectlist", this.isSelectlist)
  }

}
// location
// longitude
// latitude