import { Component, OnInit ,Input} from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-record-finish',
  templateUrl: './record-finish.page.html',
  styleUrls: ['./record-finish.page.scss'],
})
export class RecordFinishPage implements OnInit {
  text: any;

  constructor(
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
  ) {
    this.text = navParams.get('text');
    console.log(navParams.get('text'));
   }

  ngOnInit() {
  }
  async closePopover() {
    const onClosedData: string = "Wrapped Up!";
    await this.popoverCtrl.dismiss(onClosedData);
  }
}
