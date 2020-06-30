export type RecordFieldValue = number | string | boolean;

export enum RecordFieldType {
   INTEGER = 'integer',
   NUMBER = 'number',
   STRING = 'string',
   BOOLEAN = 'boolean',
}

export interface RecordFieldValueRange {
    max: number;
    min: number;
}

export interface RecordField {
    readonly name: string;
    readonly type: RecordFieldType;
    readonly defaultValue: RecordFieldValue;
    value: RecordFieldValue;
    readonly valueUnit?: string;
    readonly valueRange?: RecordFieldValueRange;
}

