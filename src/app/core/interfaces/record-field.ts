import { RecordFieldType } from '../enums/record-field-type.enum';
import { RecordFieldValueRange } from './record-field-value-range';

export type RecordFieldValue = number | string | boolean;




export interface RecordField {
    readonly name: string;
    readonly icon: string;
    readonly type: RecordFieldType;
    readonly dataGroup: string;
    readonly dataClass: string;
    value: RecordFieldValue;
    readonly valueUnit?: string;
    readonly valueRange?: RecordFieldValueRange;
    readonly options?: string[];
}

