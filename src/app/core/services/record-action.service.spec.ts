import { TestBed } from '@angular/core/testing';

import { RecordActionService } from './record-action.service';

describe('RecordActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordActionService = TestBed.get(RecordActionService);
    expect(service).toBeTruthy();
  });
});
