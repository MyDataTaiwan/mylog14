import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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
