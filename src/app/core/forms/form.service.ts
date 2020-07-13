import { Injectable } from '@angular/core';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { RecordFieldType } from '../enums/record-field-type.enum';
import { RecordField } from '../interfaces/record-field';

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
    const unit = (field.valueUnit) ? this.translate.instant('preset.' + templateName + '.unit.' + field.valueUnit) : '';
    const formFields: FormlyFieldConfig[] = [
      {
        key: field.name,
        type: 'input',
        focus: true,
        templateOptions: {
          placeholder: `${unit}`,
          type: this.getFormlyFieldType(field.type),
        },
        modelOptions: {
          updateOn: 'blur',
        },
        validators: {
          required: {
            expression: (c) => c.value != null,
            message: (error, currentField: FormlyFieldConfig) =>
              this.translate.instant('description.notInputYet'),
          },
        },
      }
    ];
    if (field.valueRange) {
      formFields[0].validators.min = {
        expression: (c) => c.value >= field.valueRange.min,
        message: (error, currentField: FormlyFieldConfig) =>
          this.translate.instant('description.mustBeNoSmallerThan', { min: field.valueRange.min }
          ),
      };
      formFields[0].validators.max = {
        expression: (c) => c.value <= field.valueRange.max,
        message: (error, currentField: FormlyFieldConfig) =>
          this.translate.instant('description.mustBeNoLargerThan', { max: field.valueRange.max }
          ),
      };
    }
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

  private getFormlyFieldType(type: RecordFieldType) {
    if (type === RecordFieldType.number) {
      return 'number';
    } else if (type === RecordFieldType.string) {
      return 'text';
    }
  }
}

