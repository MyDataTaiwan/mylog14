import { RecordFieldValueRange } from './record-field-value-range';
import { RecordFieldType } from '../enums/record-field-type.enum';

export type RecordFieldValue = number | string | boolean;




export interface RecordField {
    readonly name: string;
    readonly icon: string;
    readonly type: RecordFieldType;
    readonly defaultValue: RecordFieldValue;
    value: RecordFieldValue;
    readonly valueUnit?: string;
    readonly valueRange?: RecordFieldValueRange;
}

