import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-scanner',
  templateUrl: './shop-scanner.component.html',
  styleUrls: ['./shop-scanner.component.scss'],
})
export class ShopScannerComponent implements OnInit {

  shopId: string;

  constructor() { }

  ngOnInit() {}

  scanResultHandler(scanResult: string) {
    this.shopId = scanResult;
    // TODO: Call API here to get the Shop name
  }

}
