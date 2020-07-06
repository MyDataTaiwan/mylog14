import { TestBed } from '@angular/core/testing';

import { UserDataRepositoryService } from './user-data-repository.service';

describe('UserDataRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataRepositoryService = TestBed.get(UserDataRepositoryService);
    expect(service).toBeTruthy();
  });
});
