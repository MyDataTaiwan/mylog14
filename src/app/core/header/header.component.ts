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
  @Input() showDeleteButton?: boolean;
  @Input() showDismissButton?: boolean;
  @Output() dismissClicked = new EventEmitter<boolean>();
  @Output() deleteClicked = new EventEmitter<boolean>();

  constructor(
    private readonly location: Location,
  ) { }

  ngOnInit() {
  }

  onBackButtonClick() {
    this.location.back();
  }

  onDeleteButtonClick() {
    this.deleteClicked.emit(true);
  }

  onDismissButtonClick() {
    this.dismissClicked.emit(true);
  }

}
