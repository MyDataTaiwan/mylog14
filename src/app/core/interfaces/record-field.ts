import { RecordFieldType } from '../enums/record-field-type.enum';
import { RecordFieldValueRange } from './record-field-value-range';

export type RecordFieldValue = number | string | boolean;




export interface RecordField {
    readonly name: string;
    readonly icon: string;
    readonly type: RecordFieldType;
    readonly isKeyField?: boolean;
    readonly dataGroup: string;
    readonly dataClass: string;
    readonly defaultValue: RecordFieldValue;
    value: RecordFieldValue;
    readonly valueUnit?: string;
    readonly valueRange?: RecordFieldValueRange;
}

