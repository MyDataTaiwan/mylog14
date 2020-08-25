import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

fdescribe('UtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilityService = TestBed.inject(UtilityService);
    expect(service).toBeTruthy();
  });
});

fdescribe('gen', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should gen', () => {
    const service: UtilityService = TestBed.inject(UtilityService);
    expect(service.gen(1)).toBeDefined();
  });
});
