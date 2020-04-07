

import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
 


@Component({
  selector: 'app-categorize-finish',
  templateUrl: './categorize-finish.page.html',
  styleUrls: ['./categorize-finish.page.scss'],
})
export class CategorizeFinishPage implements OnInit {
  
  modalTitle:string;
  modelId:number;
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }
 
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