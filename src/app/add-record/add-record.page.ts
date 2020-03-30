import { Component, OnInit } from '@angular/core';
import { PickerController, ModalController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit {
  bt = '';
  btInteger = ['34', '35', '36', '37', '38', '39', '40', '41', '42'];
  btDecimal = ['.0', '.1', '.2'];

  constructor(
    private modalCtrl: ModalController,
    private pickerController: PickerController,
  ) { }

  ngOnInit() {
    this.presentBtPicker();
  }

  async presentBtPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value);
            this.bt = value.bt.value;
          }
        }
      ],
      columns: [{
        name: 'bt',
        options: this.getColumnOptions()
      }]
    };
    const picker = await this.pickerController.create(options);
    await picker.present();
  }
  getColumnOptions() {
    const options = [];
    this.btInteger.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  onCoughSegmentChanged(event) {

  }

  onFeverSegmentChanged(event) {

  }

  onRunnynoseSegmentChanged(event) {

  }

  onStuffynoseSegmentChanged(event) {

  }

  saveModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  cancelModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
