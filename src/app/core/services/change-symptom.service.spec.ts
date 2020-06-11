import { TestBed } from '@angular/core/testing';

import { ChangeSymptomService } from './change-symptom.service';

describe('ChangeSymptomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeSymptomService = TestBed.get(ChangeSymptomService);
    expect(service).toBeTruthy();
  });
});
