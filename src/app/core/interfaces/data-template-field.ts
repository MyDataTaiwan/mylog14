import { RecordFieldType } from '../enums/record-field-type.enum';
import { DataTemplateValueRange } from './data-template-value-range';
import { RecordFieldValue } from './record-field';

export interface DataTemplateField {
    readonly name: string;
    readonly icon: string;
    readonly type: RecordFieldType;
    readonly isKeyField?: boolean;
    readonly dataGroup: string;
    readonly dataClass: string;
    readonly defaultValue: RecordFieldValue;
    readonly valueUnit?: string;
    readonly valueRange?: DataTemplateValueRange;
    value?: RecordFieldValue;
}

