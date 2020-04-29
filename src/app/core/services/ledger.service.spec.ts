import { TestBed } from '@angular/core/testing';

import { LedgerService } from './ledger.service';

describe('LedgerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedgerService = TestBed.get(LedgerService);
    expect(service).toBeTruthy();
  });
});
