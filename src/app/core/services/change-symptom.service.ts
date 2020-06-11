import { Injectable } from '@angular/core';

 
export const SYMPTOM_LIST = [
  {
    name: 'custom',
    data: [
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
    ]
  },
  {
    name: 'default',
    data: [
      'coughing',
      'runnyNose',
      'nasalCongestion',
      'sneezing'
    ]
  },
];

@Injectable({
  providedIn: 'root'
})
export class ChangeSymptomService {
  /* 回傳所有症狀 */
  getSymptomLists() {
    return SYMPTOM_LIST;
  }
  /* 回傳症狀標題 (提供選單key) */
  getSymptomName() {
    return SYMPTOM_LIST.map(index => index.name)
  }
  /* 回傳單一症狀(使用選單key) */
  getSymptomItem(dataset) {
    return SYMPTOM_LIST.filter(x => x.name == dataset)[0];
  }

}
