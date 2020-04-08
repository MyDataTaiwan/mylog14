import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';
import { ModalController,PopoverController } from '@ionic/angular';
import { CategorizeFinishPage } from './categorize-finish/categorize-finish.page';
import { CategorizeImgPopoverPage } from './categorize-img-popover/categorize-img-popover.page';


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
  dataReturned:any;

  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController,
    public photoService: PhotoService,
  ) { }
 

  ngOnInit() {
  }

  ngAfterViewInit() {
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
  async presentPopover(ev?: any) {
    const popover = await this.popoverController.create({
      component: CategorizeFinishPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async openIMGModal(photo, ev?: any) {
    const popover = await this.popoverController.create({
      component: CategorizeImgPopoverPage,
      event: ev,
      translucent: true,
      componentProps: {

        "paramID": 123,
        "paramTitle": "Test Title",
        "timestamp":photo.snapshot.timestamp,
        "latitude":photo.snapshot.locationStamp.latitude,
        "longitude":photo.snapshot.locationStamp.longitude,
        "webviewPath":photo.webviewPath
      }
    });
    return await popover.present();
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: CategorizeFinishPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title",
        translucent: true,
        cssClass: "popover_class"
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    return await modal.present();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: CategorizeFinishPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }
}
