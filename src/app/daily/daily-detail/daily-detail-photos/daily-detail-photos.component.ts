import { Component, OnInit } from '@angular/core';

export interface Pic {
  src: string;
}



@Component({
  selector: 'app-daily-detail-photos',
  templateUrl: './daily-detail-photos.component.html',
  styleUrls: ['./daily-detail-photos.component.scss'],
})
export class DailyDetailPhotosComponent implements OnInit {
  
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
  constructor() { }

  ngOnInit() {
  }

}
