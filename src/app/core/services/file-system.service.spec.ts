import { TestBed } from '@angular/core/testing';

import { FileSystemService } from './file-system.service';

describe('FileSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileSystemService = TestBed.get(FileSystemService);
    expect(service).toBeTruthy();
  });
});
