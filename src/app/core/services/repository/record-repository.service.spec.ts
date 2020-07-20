import { TestBed } from '@angular/core/testing';
import { RecordRepositoryService } from './record-repository.service';
import { Record } from '@core/classes/record';
import { Meta } from '../../interfaces/meta';


describe('RecordRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);
    expect(service).toBeTruthy();
  });
});

fdescribe('save()', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should save record', async () => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);

    expect(service.save).toBeDefined();
  })
});

fdescribe('getJsonAll()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should get string JSON', async (done) => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);

    const newRecord = new Record(321);
    service.save(newRecord).subscribe({ next(x) {
      console.log('getJsonAll x', JSON.stringify(x));  
      service.getJsonAll().subscribe({ next(y) {
        console.log('y', y);
        expect(JSON.stringify(x)).toEqual(JSON.stringify(y));
        done();
      }})
    }});
  });
});

fdescribe('getAll()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should get all records', async (done) => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);

    const newRecord = new Record(123);

    service.save(newRecord).subscribe({ next(x) {
      console.log('getAll x', x);
      service.getAll().subscribe({ next(y) {
        expect(x).toEqual(y);
        done();
      }})
    }});
  });
});

fdescribe('get()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should get specified record', async (done) => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);
    
    const newRecord = new Record(20200722);
    const meta : Meta = {
      timestamp: 20200722,
      path: '20200722.json',
      hash: 'a44958ce85c695306b04b90acc5165b6ee0bdaba044d0b06682a0e13c23d3670'
    }

    const newRecordOutput = JSON.stringify(newRecord);

    service.save(newRecord).subscribe({ next(x) {
      console.log('get x', x)
      service.get(meta).subscribe({ next(y) {
        expect(JSON.stringify(y)).toEqual(newRecordOutput);
        done();
      }})
    }})
  });
});

fdescribe('getJson()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should get specified record', async (done) => {
    const service: RecordRepositoryService = TestBed.get(RecordRepositoryService);

    const newRecord = new Record(20200623);
    const newRecordOuput = JSON.stringify(newRecord);

    const meta : Meta = {
      timestamp: 20200623,
      path: '20200623.json',
      hash: 'f21773e620008909d8114096bcc7872fcc3b3ba9f63b00acbbee8649a3bdc94a'
    }

    service.save(newRecord).subscribe({ next(x) {
      console.log('getJson', x);
      service.getJson(meta).subscribe( {next(y) {
        expect(y).toEqual(newRecordOuput);
        done()
      }});
    }});
  });
});
