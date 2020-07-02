import { Symptom } from './symptom';

const FULL_SYMPTOM_LIST = [
    'coughing',
    'runnyNose',
    'nasalCongestion',
    'sneezing',
    'shortnessOfBreath',
    'malaiseOrTiredness',
    'lossOfTasteOrSmell',
    'diarrhea',
    'abdominalPain',
    'vomiting',
    'chills',
    'muscleOrJointSoreness',
    'soreThroat',
    'sputum',
    'fever'
];

const DEFAULT_SYMPTOM_LIST = [
        'coughing',
        'runnyNose',
        'nasalCongestion',
        'sneezing'
];

export class Symptoms {
    list: Symptom[] = [];
    constructor(defaultSchema: boolean) {
        FULL_SYMPTOM_LIST.forEach(symptomName => {
            const ignore = (!DEFAULT_SYMPTOM_LIST.includes(symptomName) && defaultSchema);
            this.list.push(new Symptom(symptomName, ignore));
        });
    }

    setDefault(defaultSchema: boolean) {
        this.list = this.list.map(symptom => {
            symptom.present = false;
            symptom.note = '';
            symptom.ignore = false;
            if (!DEFAULT_SYMPTOM_LIST.includes(symptom.name)) {
                symptom.ignore = defaultSchema;
            }
            return symptom;
        });
    }
}
