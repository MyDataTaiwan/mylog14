import { Component, OnInit, Input } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { ModalController } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { GuidePage } from '../guide/guide.page';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.page.html',
  styleUrls: ['./eula.page.scss'],
})
export class EulaPage implements OnInit {
  @Input() userData: UserData;
  constructor(
    private modalCtrl: ModalController,
    public translateConfig: TranslateConfigService,
  ) { }

  ngOnInit() {
  }
  async presentGuideModal(userData: UserData) {
    const modal = await this.modalCtrl.create({
      // translucent: true,
      backdropDismiss: false,
      component: GuidePage,
      componentProps: { userData },
      cssClass: 'Guide-modal',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return Promise.resolve(data);
  }

  async onClick() {
    this.userData.eulaAccepted = true;
     this.presentGuideModal(this.userData);
     await this.modalCtrl.dismiss(this.userData);
  }

}
