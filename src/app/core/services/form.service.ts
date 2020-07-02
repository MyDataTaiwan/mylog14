import { Injectable } from '@angular/core';
import { RecordField } from '../interfaces/record-field';
import { RecordFieldType } from '../enums/record-field-type.enum';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';


export const enum UserDataFormField {
  NAME = 'Name',
  EMAIL = 'Email',
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private readonly translate: TranslateService,
  ) { }

  createFormFieldsByRecordField(field: RecordField, templateName: string): FormlyFieldConfig[] {
    const name = this.translate.instant('preset.' + templateName + '.' + field.name);
    const unit = (field.valueUnit) ? this.translate.instant('preset.' + templateName + '.unit.' + field.valueUnit) : '';
    const numberOnly = (field.type === RecordFieldType.number || field.type === RecordFieldType.integer);
    const min = (field.valueRange) ? field.valueRange.min : null;
    const max = (field.valueRange) ? field.valueRange.max : null;
    const formFields: FormlyFieldConfig[] = [
      {
        key: field.name,
        type: 'customInput',
        templateOptions: {
          label: name,
          type: (numberOnly) ? 'number' : 'text',
          placeholder: this.translate.instant('title.noData'),
          required: true,
          min,
          max,
          unit,
        }
      }
    ];
    return formFields;
  }

  createFormFieldsByUserData(field: UserDataFormField) {
    switch (field) {
      case UserDataFormField.NAME:
        return this.createNameFormFields();
      case UserDataFormField.EMAIL:
        return this.createEmailFormFields();
      default:
        return [];
    }
  }

  createNameFormFields(): FormlyFieldConfig[] {
    const formFields: FormlyFieldConfig[] = [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: this.translate.instant('title.firstName'),
          maxlength: 40,
          minlength: 1,
          placeholder: this.translate.instant('title.notSet'),
          required: true,
        },
        focus: true,
      },
      {
        key: 'lastName',
        type: 'input',
        templateOptions: {
          label: this.translate.instant('title.lastName'),
          maxlength: 40,
          minlength: 1,
          placeholder: this.translate.instant('title.notSet'),
          required: true,
        },
      },
    ];
    return formFields;
  }

  createEmailFormFields(): FormlyFieldConfig[] {
    // TODO: Add email validator
    const formFields: FormlyFieldConfig[] = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          label: this.translate.instant('title.email'),
          type: 'email',
          maxlength: 345,
          minlength: 6,
          placeholder: this.translate.instant('title.notSet'),
          required: true,
        },
        focus: true,
      },
    ];
    return formFields;
  }
}

