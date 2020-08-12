import { Proof } from '../interfaces/proof';
import { RecordField, RecordFieldValue } from '../interfaces/record-field';

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

    addField(name: string, type: string): void {
        this.fields.push({
            name,
            type,
            value: null,
        });
    }

    setFieldValue(fieldName: string, value: RecordFieldValue): void {
        const field = this.fields.find(el => el.name === fieldName);
        if (!field) {
            throw new Error('Field name not found in record');
        }
        field.value = value;
    }

    setProof(proof: Proof) {
        this.timestamp = proof.timestamp;
        this.proof = proof;
    }

    setTemplateName(templateName: string): void {
        this.templateName = templateName;
    }

    resetFieldValues(): void {
        this.fields.map(el => ({ ...el, value: null }));
    }

}
