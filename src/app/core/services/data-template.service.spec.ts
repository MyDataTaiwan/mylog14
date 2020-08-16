import { TestBed } from '@angular/core/testing';

import { DataTemplateService } from './data-template.service';

describe('DataTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTemplateService = TestBed.inject(DataTemplateService);
    expect(service).toBeTruthy();
  });
});
