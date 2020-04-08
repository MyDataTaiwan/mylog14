import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
// import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //加入http類別


@Component({
  selector: 'app-categorize-img-popover',
  templateUrl: './categorize-img-popover.page.html',
  styleUrls: ['./categorize-img-popover.page.scss'],
})


export class CategorizeImgPopoverPage implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  modalTitle: string;
  modelId: number;

  timestamp: any;
  latitude: any;
  longitude: any;
  webviewPath: any;
  localData = '資訊';

  data = "szds";
  constructor(
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
    private http: HttpClient, 
  ) {
    this.data = navParams.get('firstName');
    console.log(navParams.get('firstName'));
  }

  startBackgroundGeolocation() {
    // const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.latitude + "," + this.longitude + "&language=zh-TW&key=AIzaSyC8Yg8Ig6VEZIWz8cWH3yfYOjAGzqIpDMI";
    // this.http.get
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" +25.035221+ "," + 121.557612+ "&language=zh-TW&key=AIzaSyC8Yg8Ig6VEZIWz8cWH3yfYOjAGzqIpDMI")
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
        // this.localData=posts.results[0].formatted_address;
        this.localData = posts.results[0].formatted_address;
        // alert('200 getting location' + posts.results[0].formatted_address);
      })
  }
  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.startBackgroundGeolocation();
  }

  async closePopover() {
    const onClosedData: string = "Wrapped Up!";
    await this.popoverCtrl.dismiss(onClosedData);
  }
}