import { RecordField } from './record-field';

export interface DataTemplate {
    templateName: string;
    keyFieldName: string;
    dataGroups: string[];
    fields: RecordField[];
}
