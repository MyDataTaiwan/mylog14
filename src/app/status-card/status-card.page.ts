import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.page.html',
  styleUrls: ['./status-card.page.scss'],
})
export class StatusCardPage implements OnInit {

  constructor(
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async onClick() {
    return await this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '輸入體溫（攝氏）',
      inputs: [
        {
          name: 'temperature',
          type: 'number',
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '確認',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
