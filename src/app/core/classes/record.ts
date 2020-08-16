import { cloneDeep } from 'lodash';

import { Proof } from '../interfaces/proof';
import { RecordField, RecordFieldValue } from '../interfaces/record-field';

export class Record {

    timestamp: number;
    proof: Proof;
    templateName: string;
    keyFieldName: string;
    dataGroups: string[];
    fields: RecordField[];

    constructor(timestamp: number, proof?: Proof) {
        this.timestamp = timestamp;
        this.proof = proof;
        this.fields = [];
    }

    setFields(fields: RecordField[]): void {
        this.fields = cloneDeep(fields);
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

    setKeyFieldName(keyFieldName: string): void {
        this.keyFieldName = keyFieldName;
    }

    setDataGroups(dataGroups: string[]): void {
        this.dataGroups = cloneDeep(dataGroups);
    }

    resetFieldValues(): void {
        this.fields.map(el => ({ ...el, value: null }));
    }

}
