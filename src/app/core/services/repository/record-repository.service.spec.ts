import { TestBed } from '@angular/core/testing';

import { Plugins } from '@capacitor/core';
import { Record } from '@core/classes/record';

import { Meta } from '../../interfaces/meta';
import { RecordRepositoryService } from './record-repository.service';

const { Storage } = Plugins;


describe('RecordRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);
    expect(service).toBeTruthy();
  });
});

fdescribe('save()', () => {
  let originalTimeOut;

  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  beforeEach(() => TestBed.configureTestingModule({}));

  afterEach(async () => await Storage.clear());


  it('should save record', async (done) => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);

    const record = new Record(20191208);

    const recordOutput = JSON.stringify(record);

    service.save(record, false).subscribe(x => {
      expect(JSON.stringify(x[x.length - 1])).toEqual(recordOutput);
      done();
    });
    await Storage.clear();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('save()', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should save record', () => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);

    expect(service.save).toBeDefined();
  });
});


fdescribe('getJsonAll()', () => {
  let originalTimeOut;

  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Storage.clear());

  it('should get string JSON', async (done) => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);

    const newRecord = new Record(321);
    service.save(newRecord, false).subscribe(x => {
      service.getJsonAll().subscribe(y => {
        expect(x.map(el => JSON.stringify(el))).toEqual(y);
        done();
      });
    });
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('getAll()', () => {
  let originalTimeOut;

  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Storage.clear());

  it('should get all records', async (done) => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);

    const newRecord = new Record(123);

    service.save(newRecord, false).subscribe(x => {
      service.getAll().subscribe(y => {
        expect(x).toEqual(y);
        done();
      });
    });
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('get()', () => {
  let originalTimeOut;

  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });
  beforeEach(() => TestBed.configureTestingModule({}));

  afterEach(async () => await Storage.clear());

  it('should get specified record', async (done) => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);

    const newRecord = new Record(20200722);
    const meta: Meta = {
      timestamp: 20200722,
      path: '20200722.json',
      hash: 'a44958ce85c695306b04b90acc5165b6ee0bdaba044d0b06682a0e13c23d3670'
    };

    const newRecordOutput = JSON.stringify(newRecord);

    service.save(newRecord, false).subscribe(x => {
      service.get(meta).subscribe(y => {
        expect(JSON.stringify(y)).toEqual(newRecordOutput);
        done();
      });
    });
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('getJson()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  afterEach(async () => await Storage.clear());

  it('should get specified record', async (done) => {
    const service: RecordRepositoryService = TestBed.inject(RecordRepositoryService);

    const newRecord = new Record(20200623);
    const newRecordOuput = JSON.stringify(newRecord);

    const meta: Meta = {
      timestamp: 20200623,
      path: '20200623.json',
      hash: 'f21773e620008909d8114096bcc7872fcc3b3ba9f63b00acbbee8649a3bdc94a'
    };

    service.save(newRecord, false).subscribe(x => {
      service.getJson(meta).subscribe(y => {
        expect(y).toEqual(newRecordOuput);
        done();
      });
    });
  });
});
