import { Injectable } from '@angular/core';

import * as CommonCold from 'src/app/core/presets/common-cold.json';
import * as HeartFailure from 'src/app/core/presets/heart-failure.json';

import { Record } from '../classes/record';
import { RecordFieldType } from '../enums/record-field-type.enum';

export const enum RecordPreset {
  COMMON_COLD = 'commonCold',
  HEART_FAILURE = 'heartFailure',
}


@Injectable({
  providedIn: 'root'
})
export class PresetService {

  public presets: string[] = [
    'commonCold', 'heartFailure',
  ];

  constructor() { }

  initRecordWithPreset(record: Record, preset: RecordPreset) {
    if (record.fields.length > 0) {
      throw(new Error('Record is already initiated.'));
    }
    switch (preset) {
      case RecordPreset.COMMON_COLD:
        return this.initRecordWithCommonColdPreset(record);
      case RecordPreset.HEART_FAILURE:
        return this.initRecordWithHeartFailurePreset(record);
      default:
        return this.initRecordWithCommonColdPreset(record);
    }
  }

  private initRecordWithCommonColdPreset(record: Record): Record {
    record.setTemplateName(CommonCold.templateName);
    CommonCold.fields.forEach(field => record.addField(
      field.name,
      RecordFieldType[field.type],
      field.isKeyField,
      field.dataGroup,
      field.dataClass,
      field.defaultValue,
      field.icon,
      field.valueUnit,
      field.valueRange,
      ));
    return record;
  }

  private initRecordWithHeartFailurePreset(record: Record): Record {
    record.setTemplateName(HeartFailure.templateName);
    HeartFailure.fields.forEach(field => record.addField(
      field.name,
      RecordFieldType[field.type],
      field.isKeyField,
      field.dataGroup,
      field.dataClass,
      field.defaultValue,
      field.icon,
      field.valueUnit,
      field.valueRange,
    ));
    return record;
  }
}


