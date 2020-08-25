import { TestBed } from '@angular/core/testing';
import { Record } from '../classes/record';

import { PresetService, RecordPreset } from './preset.service';

fdescribe('PresetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresetService = TestBed.inject(PresetService);
    expect(service).toBeTruthy();
  });
});

fdescribe('initRecordWithPreset with commonCold', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should initialize record with preset', () => {
    const service: PresetService = TestBed.inject(PresetService);

    const record = new Record(20190619);
    const result = service.initRecordWithPreset(record, RecordPreset.COMMON_COLD);
    expect(result.timestamp).toEqual(20190619);
    expect(result.templateName).toEqual('commonCold');
  });
});

fdescribe('initRecordWithPreset with heartfailure', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should initialize record with preset', () => {
    const service: PresetService = TestBed.inject(PresetService);

    const record = new Record(20201208);
    const result = service.initRecordWithPreset(record, RecordPreset.HEART_FAILURE);
    expect(result.timestamp).toEqual(20201208);
    expect(result.templateName).toEqual('heartFailure');
  });
});
