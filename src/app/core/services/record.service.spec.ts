import { TestBed } from '@angular/core/testing';

import { RecordService } from './record.service';
import { Record } from '@core/classes/record';
import { Plugins } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { RecordPreset } from './preset.service';

const { Storage } = Plugins;

fdescribe('RecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordService = TestBed.inject(RecordService);
    expect(service).toBeTruthy();
  });
});

fdescribe('save', () => {
  let originalTimeOut;
  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should save', async (done) => {
    const service: RecordService = TestBed.inject(RecordService);

    const record = new Record(20200730);

    service.save(record).subscribe(x => {
      expect(JSON.stringify(x[x.length - 1])).toEqual(JSON.stringify(record));
      done();
    });
    await Storage.clear();
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('attachProof method attached location proof', () => {
  let originalTimeOut;
  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
  });

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should attach proof', async (done) => {
    const service: RecordService = TestBed.inject(RecordService);

    const record = new Record(20200731);

    service.attachProof(record).subscribe(x => {
      GeolocationService.prototype.getPosition().subscribe(y => {

        expect(x.proof.location.accuracy).toEqual(y.coords.accuracy);
        expect(x.proof.location.latitude).toEqual(y.coords.latitude);
        expect(x.proof.location.longitude).toEqual(y.coords.longitude);
        done();
      });
    });
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('create method with commonCold template', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create commonCold template', () => {
    const service: RecordService = TestBed.inject(RecordService);

    service.create(RecordPreset.COMMON_COLD).subscribe(x => {
      expect(x.templateName).toEqual('commonCold');
    });
  });
});

fdescribe('create method with heartFailure template', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create heartFailure template', () => {
    const service: RecordService = TestBed.inject(RecordService);

    service.create(RecordPreset.HEART_FAILURE).subscribe(x => {
      expect(x.templateName).toEqual('heartFailure');
    });
  });
});