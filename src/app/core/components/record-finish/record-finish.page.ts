import { Component, OnInit ,Input} from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-record-finish',
  templateUrl: './record-finish.page.html',
  styleUrls: ['./record-finish.page.scss'],
})
export class RecordFinishPage implements OnInit {
  @Input() showBar: boolean;
  @Input() type: string;
  @Input() text: string;
  isShow=false
  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }
  confirm(){
    this.type=="confirm";
    return true;
  }
  async closePopover() {
    const onClosedData: string = "Wrapped Up!";
    await this.popoverCtrl.dismiss(onClosedData);
  }
}
