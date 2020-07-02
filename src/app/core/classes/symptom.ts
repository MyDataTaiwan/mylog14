export class Symptom {
    name: string;
    present: boolean;
    note: string;
    ignore?: boolean;
    constructor(name: string, ignore: boolean) {
        this.name = name;
        this.present = false;
        this.note = '';
        this.ignore = ignore;
    }
}
