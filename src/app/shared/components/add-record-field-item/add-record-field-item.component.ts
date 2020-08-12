import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { of, Subject } from 'rxjs';
import { catchError, filter, map, takeUntil, tap } from 'rxjs/operators';

import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { FormService } from '@core/forms/form.service';
import { DataTemplateField } from '@core/interfaces/data-template-field';
import { PhotoService } from '@core/services/photo.service';
import { PopoverService } from '@shared/services/popover.service';

@Component({
  selector: 'app-add-record-field-item',
  templateUrl: './add-record-field-item.component.html',
  styleUrls: ['./add-record-field-item.component.scss'],
})
export class AddRecordFieldItemComponent implements OnInit, OnDestroy {

  @Input() field: DataTemplateField;
  @Input() templateName: string;

  recordFieldType = RecordFieldType;

  destroy$ = new Subject();

  constructor(
    private readonly formService: FormService,
    private readonly photoService: PhotoService,
    private readonly popoverService: PopoverService,
  ) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onItemClicked() {
    if (this.field.type === RecordFieldType.boolean) {
      return;
    }
    const update$ = (this.field.type === RecordFieldType.photo) ? this.updateValueWithPhoto() : this.updateValueWithForm();
    update$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private updateValueWithPhoto() {
    return this.photoService.create()
      .pipe(
        catchError(() => of(null)),
        filter(byteString => byteString !== null),
        tap((byteString: string) => this.field.value = byteString),
      );
  }

  private updateValueWithForm() {
    const formModel = {};
    formModel[this.field.name] = this.field.value;
    return this.popoverService.showPopover({
      i18nTitle: `dataTemplate.${this.templateName}.${this.field.name}`,
      i18nMessage: '',
      formModel,
      formFields: this.formService.createFormFieldsByRecordField(this.field, this.templateName),
    })
      .pipe(
        tap(e => console.log(e)),
        map(result => result?.data),
        filter(data => data != null),
        map(data => data[this.field.name]),
        tap(value => this.field.value = value),
      );
  }

}
