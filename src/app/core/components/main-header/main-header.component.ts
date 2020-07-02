import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() headerTitle: string;
  @Input() showDismissButton?: boolean;
  @Output() dismissClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onDismissClicked() {
    this.dismissClicked.emit(true);
  }

}
