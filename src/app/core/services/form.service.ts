import { Injectable } from '@angular/core';
import { RecordField } from '../interfaces/record-field';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private readonly translate: TranslateService,
  ) { }

  createFormFields(field: RecordField, templateName: string): FormlyFieldConfig[] {
    const formFields: FormlyFieldConfig[] = [
      {
        key: field.name,
        type: 'input',
        templateOptions: {
          label: this.translate.instant('preset.' + templateName + '.' + field.name),
          placeholder: this.translate.instant('title.notSet'),
          required: true,
        }
      }
    ];
    return formFields;
  }
}
