import { DataTemplateField } from './data-template-field';

export interface DataTemplate {
    templateName: string;
    keyFieldName: string;
    dataGroups: string[];
    fields: DataTemplateField[];
}
