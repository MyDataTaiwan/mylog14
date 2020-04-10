export class Symptom {
    name: string;
    present: boolean;
    note: string;
    constructor(name: string) {
        this.name = name;
        this.present = false;
        this.note = '';
    }
}
