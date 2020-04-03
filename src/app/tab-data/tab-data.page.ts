import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-data',
  templateUrl: 'tab-data.page.html',
  styleUrls: ['tab-data.page.scss']
})
export class TabDataPage implements OnInit {
  componentId = 0;
  constructor() { }
  ngOnInit() {
  }

  onComponentIdChanged(newId: number) {
    this.componentId = newId;
  }

}
