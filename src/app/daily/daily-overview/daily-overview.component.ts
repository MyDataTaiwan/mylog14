import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-overview',
  templateUrl: './daily-overview.component.html',
  styleUrls: ['./daily-overview.component.scss'],
})
export class DailyOverviewComponent implements OnInit {
  items = [
    {
      day: 8,
      month: '03',
      date: '30',
      bt: 37.9,
      // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
      imgHeight: 300,
    },
    {
      day: 7,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 6,
      month: '03',
      date: '30',
      bt: 37.9,
      // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
      imgHeight: 300,
    },
    {
      day: 5,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 4,
      month: '03',
      date: '30',
      bt: 37.9,
      // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
      imgHeight: 300,
    },
    {
      day: 3,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 2,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 1,
      month: '03',
      date: '29',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    }, {
      day: 0,
      month: '00',
      date: '00',
      bt: 37.3,
      // Free-to-use mock image from https://pixabay.com/photos/sleeping-dog-street-dog-animal-2837631/
      imgSrc: 'https://cdn.pixabay.com/photo/2017/10/10/15/38/sleeping-dog-2837631_1280.jpg',
      imgHeight: 400,
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
