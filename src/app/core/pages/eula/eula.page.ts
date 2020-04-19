import { Component, OnInit, Input } from '@angular/core';
import { UserData } from '../../interfaces/user-data';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-eula',
  templateUrl: './eula.page.html',
  styleUrls: ['./eula.page.scss'],
})
export class EulaPage implements OnInit {
  @Input() userData: UserData;
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.userData.eulaAccepted = true;
    this.modalCtrl.dismiss(this.userData);
  }

}
