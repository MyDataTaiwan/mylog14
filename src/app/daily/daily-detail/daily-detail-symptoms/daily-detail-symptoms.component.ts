import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-detail-symptoms',
  templateUrl: './daily-detail-symptoms.component.html',
  styleUrls: ['./daily-detail-symptoms.component.scss'],
})
export class DailyDetailSymptomsComponent implements OnInit {
  isShow = true;

  list = [
    {
      date: "2020/03/28",
      day: 1,
      isShhow: true,
      isSelect: false,
      temperatureList: [
        {
          temperature: 36.5,
          time: '09:11',
          cough: {
            isShow: true,
            detail: '5分鐘咳了10次左右'
          },
          fever: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          runnyNose: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          stuffyNose: {
            isShow: true,
            detail: '有點嗅覺失靈'
      
          }

        }, {
          temperature: 25.0,
          time: '09:11',
          cough: {
            isShow: true,
            detail: '5分鐘咳了10次左右'
          },
          fever: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          runnyNose: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          stuffyNose: {
            isShow: true,
            detail: '有點嗅覺失靈'
      
          }
        }
    ,
        {
          temperature: 36.5,
          time: '09:11',
          cough: {
            isShow: true,
            detail: '5分鐘咳了10次左右'
          },
          fever: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          runnyNose: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          stuffyNose: {
            isShow: true,
            detail: '有點嗅覺失靈'
      
          }
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
          time: '09:11',
          cough: {
            isShow: true,
            detail: '5分鐘咳了10次左右'
          },
          fever: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          runnyNose: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          stuffyNose: {
            isShow: true,
            detail: '有點嗅覺失靈'
      
          }
        }, {
          temperature: 25.0,
          time: '09:11',
          cough: {
            isShow: true,
            detail: '5分鐘咳了10次左右'
          },
          fever: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          runnyNose: {
            isShow: false,
            detail: '5分鐘咳了10次左右'
      
          },
          stuffyNose: {
            isShow: true,
            detail: '有點嗅覺失靈'
      
          }
        }
      ]
    },
  ]
  data = {
    cough: {
      isShow: true,
      detail: '5分鐘咳了10次左右'
    },
    fever: {
      isShow: false,
      detail: '5分鐘咳了10次左右'

    },
    runnyNose: {
      isShow: false,
      detail: '5分鐘咳了10次左右'

    },
    stuffyNose: {
      isShow: true,
      detail: '有點嗅覺失靈'

    }
  };
  cough = false;
  fever = false;
  runnyNose = false;
  stuffyNose = false;
  constructor() { }

  ngOnInit() {
  }

}
