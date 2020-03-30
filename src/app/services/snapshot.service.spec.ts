import { TestBed } from '@angular/core/testing';

import { SnapshotService } from './snapshot.service';

describe('SnapshotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnapshotService = TestBed.get(SnapshotService);
    expect(service).toBeTruthy();
  });
});
