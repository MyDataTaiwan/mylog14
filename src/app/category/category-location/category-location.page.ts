import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';
import { takeUntil, map, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-location',
  templateUrl: './category-location.page.html',
  styleUrls: ['./category-location.page.scss'],
})
export class CategoryLocationPage implements OnInit, OnDestroy {
  isShow = true;
  isSelect = false;
  isSelectlist = [];
  tempLocation = '25.035221,121.557612';
  photoLocation = '';
  destroyer$ = new Subject();
  baseUrl = 'https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&z=16&output=embed&t=&q=';
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
  constructor(
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.photoService.photos$.pipe(
      takeUntil(this.destroyer$),
      filter(photos => (photos[0]) && true),
      map(photos => photos[0].snapshot.locationStamp)
      ).subscribe(location => {
        this.photoLocation = `${location.latitude},${location.longitude}`;
        this.url = this.baseUrl + this.photoLocation;
      });
    this.photoService.loadSaved();
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.complete();
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
// location
// longitude
// latitude