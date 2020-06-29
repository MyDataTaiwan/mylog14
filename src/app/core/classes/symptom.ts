export class Symptom {
    name: string;
    present: boolean;
    value?: number;
    note: string;
    ignore?: boolean;
    constructor(name: string, ignore: boolean, value?: number) {
        this.name = name;
        this.present = false;
        this.note = '';
        this.ignore = ignore;
        if (value) {
            this.value = value;
        }
    }
}
