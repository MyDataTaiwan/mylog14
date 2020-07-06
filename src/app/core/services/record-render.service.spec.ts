import { TestBed } from '@angular/core/testing';

import { RecordRenderService } from './record-render.service';

describe('RecordRenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordRenderService = TestBed.get(RecordRenderService);
    expect(service).toBeTruthy();
  });
});
