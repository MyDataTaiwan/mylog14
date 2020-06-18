import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss'],
})
export class ShopScannerComponent implements OnInit {

  shopId: string;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  scanResultHandler(scanResult: string) {
    this.shopId = scanResult;
    // TODO: Call API here to get the Shop name
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
  }

}
