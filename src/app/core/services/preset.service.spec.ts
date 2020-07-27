import { TestBed } from '@angular/core/testing';
import { PresetService } from './preset.service';

describe('PresetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresetService = TestBed.inject(PresetService);
    expect(service).toBeTruthy();
  });
});
