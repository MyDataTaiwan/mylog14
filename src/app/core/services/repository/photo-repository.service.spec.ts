import { TestBed } from '@angular/core/testing';

import { PhotoRepositoryService } from './photo-repository.service';

describe('PhotoRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoRepositoryService = TestBed.get(PhotoRepositoryService);
    expect(service).toBeTruthy();
  });
});
