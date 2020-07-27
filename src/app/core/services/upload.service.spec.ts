import { TestBed } from '@angular/core/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadService = TestBed.inject(UploadService);
    expect(service).toBeTruthy();
  });
});
