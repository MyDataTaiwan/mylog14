import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-bt',
  templateUrl: './category-bt.page.html',
  styleUrls: ['./category-bt.page.scss'],
})
export class CategoryBtPage implements OnInit {
  isShow: true;
  isSelect: true;
  isSelectlist = [];
  list = [
    {
      date: "2020/03/28",
      day: 1,
      isShhow: true,
      isSelect: false,
      temperatureList: [
        {
          temperature: 36.5,
          time: '09:11'
        }, {
          temperature: 25.0,
          time: '09:11'
        }
      ]
    },
    {
      date: "2020/03/29",
      day: 2,
      isShhow: true,
      isSelect: false,
      temperatureList: [
        {
          temperature: 36.5,
          time: '09:11'
        }, {
          temperature: 25.0,
          time: '09:11'
        }
      ]
    }, {
      date: "2020/03/30",
      day: 3,
      isShhow: true,
      isSelect: false,
      temperatureList: [
        {
          temperature: 36.5,
          time: '09:11'
        }, {
          temperature: 25.0,
          time: '09:11'
        }
      ]
    },
  ]
  constructor() { }
  days = [
    5, 4, 3, 2, 1
  ];
  ngOnInit() {
  }  addSelect(data) {
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
