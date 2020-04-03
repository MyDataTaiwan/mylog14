import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-category-pending',
  templateUrl: './category-pending.page.html',
  styleUrls: ['./category-pending.page.scss'],
})

export class CategoryPendingPage implements OnInit, AfterViewInit {
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
  constructor(
    public photoService: PhotoService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.photoService.loadSaved();
  }

  onClickShowImageSnapshot(photo) {
    alert(photo.snapshot.timestamp+"|"+photo.snapshot.locationStamp.latitude+"|"+photo.snapshot.locationStamp.longitude);
    console.log(photo.snapshot);
    /* Example photo.snapshot:
    {
      timestamp: 1585922525831,
      locationStamp: {
        latitude: 24.9985271,
        longitude: 121.4570335,
        accuracy: 2794,
      }
    }
    */
  }

  onSubmitClick() {

  }

  onLaterClick() {

  }
}
