import { TestBed } from '@angular/core/testing';
import { LedgerService } from './ledger.service';

describe('LedgerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedgerService = TestBed.inject(LedgerService);
    expect(service).toBeTruthy();
  });
});
