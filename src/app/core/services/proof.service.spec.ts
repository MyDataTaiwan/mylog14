import { TestBed } from '@angular/core/testing';
import { ProofService } from './proof.service';

describe('ProofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProofService = TestBed.inject(ProofService);
    expect(service).toBeTruthy();
  });
});
