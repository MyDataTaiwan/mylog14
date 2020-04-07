import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-categorize-img-popover',
  templateUrl: './categorize-img-popover.page.html',
  styleUrls: ['./categorize-img-popover.page.scss'],
})


export class CategorizeImgPopoverPage implements OnInit {
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  modalTitle:string;
  modelId:number;
 
  timestamp:any;
  latitude:any;
  longitude:any;
  webviewPath:any;

  data="szds";
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
     this.data=navParams.get('firstName');
    console.log(navParams.get('firstName'));
   }
 
  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}