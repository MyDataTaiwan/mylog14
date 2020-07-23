import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Record } from 'src/app/core/classes/record';

import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalService } from '@shared/services/modal.service';

export interface Pic {
  src: string;
}

export interface ModalAction {
  delete: boolean;
}

@Component({
  selector: 'app-daily-photos',
  templateUrl: './daily-photos.component.html',
  styleUrls: ['./daily-photos.component.scss'],
})
export class DailyPhotosComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  @Input() date: string;
  records$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => recordsByDate[this.date]),
      map(records => {
        if (records) {
          return records.filter(record =>
            record.fields.find(field => field.type === RecordFieldType.photo && field.value)
          );
        } else {
          return records;
        }
      })
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly modalService: ModalService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showPhotoViewer(record: Record) {
    this.modalService.showPhotoViewerModal(record)
      .pipe(
        switchMap(() => this.records$),
        switchMap(records => (records) ? of() : this.router.navigate(['/'])),
        takeUntil(this.destroy$),
      ).subscribe();
  }

}
