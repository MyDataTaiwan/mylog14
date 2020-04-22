import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SharePage } from '../../pages/share/share.page';
import { defer, from, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() headerTitle: string;
  @Input() componentId: number;
  @Input() componentNum: number;
  @Output() idChanged = new EventEmitter<number>();
  destroy$ = new Subject();

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {}

  onClickCycleView() {
    const max = this.componentNum - 1;
    const newId = (this.componentId === max) ? 0 : this.componentId + 1;
    this.idChanged.emit(newId);
  }

  onClickShare() {
    this.createPopover()
      .pipe(
        switchMap(popover => popover.present()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { }, e => console.log(e));
  }

  createPopover(): Observable<HTMLIonPopoverElement> {
    return defer(() => from(this.popoverCtrl.create({
      component: SharePage,
    })));
  }

}
