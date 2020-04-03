import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorize-data',
  templateUrl: './categorize-data.page.html',
  styleUrls: ['./categorize-data.page.scss'],
})

export class CategorizeDataPage implements OnInit {
  isSelect= false;
  catPic = {
    // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
    src: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
  };
  dogPic= {
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

  onSubmitClick() {

  }

  onLaterClick() {

  }
}
