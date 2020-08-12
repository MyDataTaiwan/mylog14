export type RecordFieldValue = number | string | boolean;


export interface RecordField {
    readonly name: string;
    readonly type: string;
    value: RecordFieldValue;
}
