import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle: string;
  @Input() showBackButton?: boolean;
  @Input() showDismissButton?: boolean;
  @Output() dismissClicked = new EventEmitter<boolean>();

  constructor(
    private readonly location: Location,
  ) { }

  ngOnInit() {
  }

  onBackButtonClick() {
    this.location.back();
  }

  onDismissButtonClick() {
    this.dismissClicked.emit(true);
  }

}
