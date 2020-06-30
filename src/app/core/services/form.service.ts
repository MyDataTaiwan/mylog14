import { Injectable } from '@angular/core';
import { RecordField } from '../interfaces/record-field';
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
          placeholder: this.translate.instant('title.notSet'),
          required: true,
        },
        focus: true,
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
          placeholder: this.translate.instant('title.notSet'),
          required: true,
        },
        focus: true,
      },
    ];
    return formFields;
  }
}

