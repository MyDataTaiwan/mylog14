import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() componentId: number;
  @Input() componentNum: number;
  @Output() idChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

  onClickCycleView() {
    const max = this.componentNum - 1;
    const newId = (this.componentId === max) ? 0 : this.componentId + 1;
    this.idChanged.emit(newId);
  }

}
