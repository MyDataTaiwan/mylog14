import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-symptoms',
  templateUrl: './category-symptoms.page.html',
  styleUrls: ['./category-symptoms.page.scss'],
})
export class CategorySymptomsPage implements OnInit {
  isShow = true;
  isSelect = false;
  isSelectlist = [];
  list = [
    {
      date: "2020/03/28",
      day: 1,
      isShhow: true,
      isSelect: false,
      symptom: [
        {
          type: "流鼻水",
          detail: "用掉半包衛生紙ＱＱ",
          time: '09:11'
        }, {
          type: "咳嗽"  ,
          detail: "咳得蠻大力的",
          time: '09:11'
        }, {
          type: "有點嗅覺失靈"  ,
          detail: "",
          time: '09:11'
        }
      ]
    },
    {
      date: "2020/03/29",
      day: 2,
      isShhow: true,
      isSelect: false,
      symptom: [
        {
          type: "流鼻水",
          detail: "用掉半包衛生紙ＱＱ",
          time: '09:11'
        }, {
          type: "咳嗽"  ,
          detail: "咳得蠻大力的",
          time: '09:11'
        }, {
          type: "有點嗅覺失靈"  ,
          detail: "",
          time: '09:11'
        }
      ]
    }, {
      date: "2020/03/30",
      day: 3,
      isShhow: true,
      isSelect: false,
      symptom: [
        {
          type: "流鼻水",
          detail: "用掉半包衛生紙ＱＱ",
          time: '09:11'
        }, {
          type: "咳嗽"  ,
          detail: "咳得蠻大力的",
          time: '09:11'
        }, {
          type: "有點嗅覺失靈"  ,
          detail: "",
          time: '09:11'
        }
      ]
    },
  ]
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
  
  showAlert(msg: string) {
    alert(msg);
  }
}
