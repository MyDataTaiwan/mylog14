import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-record-finish',
  templateUrl: './record-finish.page.html',
  styleUrls: ['./record-finish.page.scss'],
})
export class RecordFinishPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }
  async closePopover() {
    const onClosedData: string = "Wrapped Up!";
    await this.popoverCtrl.dismiss(onClosedData);
  }
}
