import { TestBed } from '@angular/core/testing';

import { Record } from '../../classes/record';
import { UserData } from '../../interfaces/user-data';
import { DataStoreService } from './data-store.service';

describe('DataStoreService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStoreService = TestBed.inject(DataStoreService);
    expect(service).toBeTruthy();
  });
});

fdescribe('pushData()', () => {
  let originalTimeOut;

  beforeEach(() => {
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should push', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const record = new Record(20190619);
    service.pushRecord(record).subscribe(x => {
      expect(JSON.stringify(x[x.length - 1])).toEqual(JSON.stringify(record));
      done();
    });
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });
});

fdescribe('createOrReplaceUserData()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create or replace', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const userData: UserData = {
      firstName: 'John',
      lastName: 'Smith',
      dataTemplateName: 'commonCold',
      newUser: false
    };

    const expectedOutput = JSON.stringify(userData);

    service.createOrReplaceUserData(userData).subscribe(x => {
      expect(JSON.stringify(x)).toEqual(expectedOutput);
      done();
    });
  });
});

fdescribe('createOrReplaceUserData()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should replace', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const existUserData: UserData = {
      firstName: 'Ronald',
      lastName: 'Weasly',
      dataTemplateName: 'commonCold',
      newUser: true
    };

    const replaceUser: UserData = {
      firstName: 'Percy',
      lastName: 'Weasly',
      dataTemplateName: 'heartFailure',
      newUser: false
    };

    const expectedReplacement = JSON.stringify(replaceUser);

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.createOrReplaceUserData(replaceUser).subscribe(y => {
        expect(y).not.toEqual(x);
        expect(JSON.stringify(y)).toEqual(expectedReplacement);
        done();
      });
    });
  });
});

fdescribe('updateUserData() first & last name', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should update user data', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const existUserData: UserData = {
      firstName: 'Emily',
      lastName: 'Anthony',
      dataTemplateName: 'heartFailure',
      newUser: true
    };

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.updateUserData({ firstName: 'Charlie', lastName: 'Chaplin' }).subscribe(y => {
        expect(y).not.toEqual(x);

        expect(y.firstName).not.toEqual(x.firstName);

        expect(y.firstName).toEqual('Charlie');

        expect(y.lastName).not.toEqual(x.lastName);

        expect(y.lastName).toEqual('Chaplin');

        expect(y.dataTemplateName).toEqual(x.dataTemplateName);

        expect(y.newUser).toEqual(x.newUser);

        done();
      });
    });
  });
});


fdescribe('updateUserData() with nothing', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should do nothing', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const existUserData: UserData = {
      firstName: 'Harry',
      lastName: 'Potter',
      dataTemplateName: 'commonCold',
      newUser: false
    };

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.updateUserData({}).subscribe(y => {
        expect(y).toEqual(x);
        done();
      });
    });
  });
});

fdescribe('updateUserData() with recordPresent and newUser', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should udpate recordPresent and newUser', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const existingUserData: UserData = {
      firstName: 'Mary',
      lastName: 'Poppins',
      dataTemplateName: 'commonCold',
      newUser: true
    };

    service.createOrReplaceUserData(existingUserData).subscribe(x => {
      service.updateUserData({ dataTemplate: 'heartFailure', newUser: false }).subscribe({
        next(y) {

          expect(y).not.toEqual(x);

          expect(y.dataTemplateName).not.toEqual(x.dataTemplateName);

          expect(y.newUser).not.toEqual(x.newUser);

          expect(y.firstName).toEqual(x.firstName);

          expect(y.lastName).toEqual(y.lastName);

          expect(y.dataTemplateName).toEqual('heartFailure');

          expect(y.newUser).toEqual(false);

          done();
        }
      });
    });
  });
});
