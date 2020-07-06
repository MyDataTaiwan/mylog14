import { TestBed } from '@angular/core/testing';

import { FormValidatorService } from './form-validator.service';

describe('FormValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormValidatorService = TestBed.get(FormValidatorService);
    expect(service).toBeTruthy();
  });
});
