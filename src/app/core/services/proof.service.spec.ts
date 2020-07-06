import { TestBed } from '@angular/core/testing';

import { ProofService } from './proof.service';

describe('ProofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProofService = TestBed.get(ProofService);
    expect(service).toBeTruthy();
  });
});
