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

const HEART_FAILURE_LIST = [
    'SBP',
    'DBP',
    'heartbeat',
    'bloodSugar',
    'weight',
    'urineVolume',
];

export class Symptoms {
    list: Symptom[] = [];
    constructor(defaultSchema: boolean) {
        if (defaultSchema) {
            DEFAULT_SYMPTOM_LIST.forEach(symptomName => {
                this.list.push(new Symptom(symptomName, false));
            });
        } else {
            HEART_FAILURE_LIST.forEach(symptomName => {
                this.list.push(new Symptom(symptomName, false, null));
            });
        }
    }

    setDefault(defaultSchema: boolean) {
        this.list = this.list.map(symptom => {
            symptom.present = false;
            symptom.note = '';
            symptom.ignore = false;
            symptom.value = null;
            return symptom;
        });
    }
}
