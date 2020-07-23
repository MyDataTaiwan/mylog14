import { RecordFieldType } from '../enums/record-field-type.enum';
import { Proof } from '../interfaces/proof';
import { RecordField, RecordFieldValue } from '../interfaces/record-field';
import { RecordFieldValueRange } from '../interfaces/record-field-value-range';

export class Record {

    timestamp: number;
    proof: Proof;
    templateName: string;
    readonly fields: RecordField[];

    constructor(timestamp: number, proof?: Proof) {
        this.timestamp = timestamp;
        this.proof = proof;
        this.fields = [];
    }

    addField(
        name: string,
        type: RecordFieldType,
        isKeyField: boolean,
        dataGroup: string,
        dataClass: string,
        defaultValue: RecordFieldValue,
        icon?: string,
        valueUnit?: string,
        valueRange?: RecordFieldValueRange
    ): void {
        this.fields.push({
            name,
            icon,
            type,
            isKeyField,
            dataGroup,
            dataClass,
            defaultValue,
            value: defaultValue,
            valueUnit,
            valueRange,
        });
    }

    setFieldValue(name: string, value: RecordFieldValue): void {
        const field = this.fields.find(el => el.name === name);
        if (field.type === 'number') {
            field.value = +value;
        } else {
            field.value = value;
        }
    }

    setProof(proof: Proof) {
        this.timestamp = proof.timestamp;
        this.proof = proof;
    }

    setTemplateName(templateName: string): void {
        this.templateName = templateName;
    }

    resetFieldValues(): void {
        this.fields.map(el => ({ ...el, value: el.defaultValue }));
    }

}
