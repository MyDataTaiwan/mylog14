import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-category-bt',
  templateUrl: './category-bt.page.html',
  styleUrls: ['./category-bt.page.scss'],
})
export class CategoryBtPage implements OnInit {
  isShow = true;
  isSelect = false;
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
  tempList= [
    {
      temperature: 36.5,
      time: '08:11'
    }, {
      temperature: 25.0,
      time: '09:11'
    }, {
      temperature: 35.0,
      time: '19:11'
    }, {
      temperature: 34.8,
      time: '12:11'
    }
  ]
 labelList=[];
 dataList=[];
  // @ViewChild('barChart') barChart;
  @ViewChild('barChart', { static: false }) barChart;

  bars: any;
  colorArray: any;
  constructor() { }

  days = [
    5, 4, 3, 2, 1
  ];
  ionViewDidEnter() {
    this.createBarChart();
  }
  ngOnInit() {
  } addSelect(data) {
    data.isSelect = !data.isSelect;
    this.isSelectlist.push(data);
    console.log("isSelectlist", this.isSelectlist)
  }
  delSelect(data) {
    data.isSelect = !data.isSelect;
    console.log("isSelectlist", this.isSelectlist)
    var index = this.isSelectlist.indexOf(data);
    if (index > - 1) {
      this.isSelectlist.splice(index, 1);
    }
    console.log("isSelectlist", this.isSelectlist)
  }
  ChangeShow_push(ToDay){
    ToDay.isShow=!ToDay.isShow;
    this.tempList=ToDay.temperatureList;
 

   this.tempList.map(index=>{
  this.labelList.push(index.time)
  this.dataList.push(index.temperature)
    })
    this.createToDayChart();

    console.log("ChartSelect_in", ToDay.temperatureList)
    console.log("ChartSelect_out", this.tempList)
  }
  ChangeShow_pop(ToDay){
    ToDay.isShow=!ToDay.isShow;
    this.tempList=[];
    this.labelList=[];
    this.dataList=[];
    this.createBarChart();
    console.log("ChartSelect_out", this.tempList)
  }
    

  createBarChart() {
    // this.bars = new Chart(this.barChart.nativeElement, {
    //   type: 'bar',
    //   data: {
    //     labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
    //     datasets: [{
    //       label: 'Viewers in millions',
    //       data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
    //       backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
    //       borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });
      this.bars =new Chart(this.barChart.nativeElement, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10','Day 11','Day 12','Day 13','Day 14',],
            datasets: [{
                label: 'My body temperature',
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(82, 199, 244)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },
        // Configuration options go here
        options: {}
    });
  }

  createToDayChart() {
    //   var labelList=[];
  //   var dataList=[];

  //  this.tempList.map(index=>{
  //   labelList.push(index.time)
  //   dataList.push(index.temperature)
  //   })
    console.log("labelList",this.labelList);
    console.log("dataList",this.dataList);

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {

        // labels: ['09:00', '12:00', '14:00', '16:00', '22:00'],
        labels: this.labelList,
        datasets: [{
          label: 'My body temperature',
          // backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.dataList
          // data: [25, 36.4, 39, 36, 35.6]
        }]
      },
      options: {}
    });
  }

  showAlert(msg: string) {
    alert(msg);
  }

}
