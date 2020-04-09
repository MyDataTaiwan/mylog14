import { Component, OnInit,AfterViewInit } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';

export interface Pic {
  src: string;
}



@Component({
  selector: 'app-daily-detail-photos',
  templateUrl: './daily-detail-photos.component.html',
  styleUrls: ['./daily-detail-photos.component.scss'],
})
export class DailyDetailPhotosComponent implements OnInit {
  // <FIXME>
   today=new Date();///換成想要的日期  // <FIXME>

  catPic: Pic = {
    // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
    src: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
  };
  dogPic: Pic = {
    // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
    src: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
  };
  pics = [
   [this.catPic, this.dogPic, this.catPic],
   [this.dogPic, this.catPic, this.dogPic],
   [this.catPic, this.dogPic, this.catPic],
   [this.dogPic, this.catPic, this.dogPic],
   [this.catPic, this.dogPic, this.catPic],
   [this.dogPic, this.catPic, this.dogPic],
  ];
  constructor(
    public photoService: PhotoService,

  ) { }

  ngOnInit() {
  }
  toDayPhotos(photo,today) {//篩選當日照片
    // console.log("photoList" + photo.snapshot.timestamp);

    if (new Date(parseInt(photo.snapshot.timestamp,10)).getUTCMonth() == new Date(today).getUTCMonth() &&new Date(parseInt(photo.snapshot.timestamp,10)).getUTCDate() == new Date(today).getUTCDate()){
      // if (new Date(parseInt(photo.snapshot.timestamp,10)).getUTCMonth() == new Date().getUTCMonth() ){
        // console.log("photoY" + photo.snapshot.path);
      return true;
    }else{
      // console.log("photoN" + photo.snapshot.path);
      return false;
    }
  }
}
