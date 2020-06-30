import { Proof } from '../interfaces/proof';
import { RecordField, RecordFieldType, RecordFieldValueRange, RecordFieldValue } from '../interfaces/record-field';

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
        defaultValue: RecordFieldValue,
        valueUnit?: string,
        valueRange?: RecordFieldValueRange
    ): void {
        this.fields.push({
            name,
            type,
            defaultValue,
            value: defaultValue,
            valueUnit,
            valueRange,
        });
    }

    setFieldValue(name: string, value: RecordFieldValue): void {
        this.fields.find(el => el.name === name).value = value;
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
