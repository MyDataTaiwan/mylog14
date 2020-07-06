import { TestBed } from '@angular/core/testing';
import { RecordRepositoryService } from './record-repository.service';

describe('RecordRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);
    expect(service).toBeTruthy();
  });
});
