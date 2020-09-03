import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { UntilDestroy } from '@ngneat/until-destroy';
import { ModalService } from '@shared/services/modal.service';

@UntilDestroy()
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnDestroy {
  destroy$ = new Subject();
  selectedTab: string;
  constructor(
    private readonly modalService: ModalService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionTabsDidChange(event: TabsEvent) {
    this.selectedTab = event.tab;
  }

  onClickCameraButton() {
    this.modalService.showAddPhotoModal()
      .pipe(
        first(),
      ).subscribe();
  }

  onClickRecordButton() {
    this.modalService.showAddRecordModal()
      .pipe(
        first(),
      ).subscribe();
  }

}

export interface TabsEvent {
  tab: string;
}
