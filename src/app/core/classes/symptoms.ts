import { Symptom } from './symptom';

// const SYMPTOM_LIST = [
//     'coughing',
//     'runnyNose',
//     'nasalCongestion',
//     'sneezing',
//     'shortnessOfBreath',
//     'malaiseOrTiredness',
//     'lossOfTasteOrSmell',
//     'diarrhea',
//     'abdominalPain',
//     'vomiting',
//     'chills',
//     'muscleOrJointSoreness',
//     'soreThroat',
//     'sputum',
//     'fever'
// ];

const SYMPTOM_LIST = [
  
        'coughing',
        'runnyNose',
        'nasalCongestion',
        'sneezing'
];

export class Symptoms {
    list: Symptom[] = [];
    constructor() {
        SYMPTOM_LIST.forEach(symptomName => this.list.push(new Symptom(symptomName)));
        // SYMPTOM_LIST.forEach(symptomName => this.list.push(new Symptom(symptomName)));

    }

    setDefault() {
        this.list = this.list.map(symptom => {
            symptom.present = false;
            symptom.note = '';
            return symptom;
        });
    }
}
