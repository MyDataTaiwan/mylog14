import { Symptom } from './symptom';

describe('Symptom', () => {
  it('should create an instance', () => {
    expect(new Symptom('name', false)).toBeTruthy();
  });
});
