import { TestBed } from '@angular/core/testing';
import { DataStoreService } from './data-store.service';
import { Record } from '../../classes/record';
import { UserData } from '../../interfaces/user-data';
import { RecordPreset } from '../preset.service';


describe('DataStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStoreService = TestBed.get(DataStoreService);
    expect(service).toBeTruthy();
  });
});

fdescribe('pushData()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should push', async (done) => {
    const service : DataStoreService = TestBed.get(DataStoreService);

    const record = new Record(20190619);
    service.pushRecord(record).subscribe({ next(x) { 
      console.log('result', JSON.stringify(x[x.length -1]));
      console.log('compare', JSON.stringify(record));
      expect(JSON.stringify(x[x.length -1])).toEqual(JSON.stringify(record));
      done();
     }});
  })
});

fdescribe('createOrReplaceUserData()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create or replace', async (done) => {
    const service : DataStoreService = TestBed.get(DataStoreService);

    const userData : UserData = {
      firstName: 'John',
      lastName: 'Smith',
      recordPreset: RecordPreset.COMMON_COLD,
      newUser: false
    };

    const expectedOutput = JSON.stringify(userData);

    service.createOrReplaceUserData(userData).subscribe({ next(x) { 
      expect(JSON.stringify(x)).toEqual(expectedOutput);
      done();
     }});
  });
});

fdescribe('createOrReplaceUserData()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should replace', async (done) => {
    const service : DataStoreService = TestBed.get(DataStoreService);

    const existUserData : UserData = {
      firstName: 'Ronald',
      lastName: 'Weasly',
      recordPreset: RecordPreset.COMMON_COLD,
      newUser: true
    }

    const replaceUser : UserData = {
      firstName: 'Percy',
      lastName: 'Weasly',
      recordPreset: RecordPreset.HEART_FAILURE,
      newUser: false
    }

    const expectedReplacement = JSON.stringify(replaceUser);

    service.createOrReplaceUserData(existUserData).subscribe({ next(x) {
      service.createOrReplaceUserData(replaceUser).subscribe({ next(y) {
        expect(y).not.toEqual(x);

        expect(JSON.stringify(y)).toEqual(expectedReplacement);
        done();
      }})
    }})
  })
})

fdescribe('updateUserData() first & last name', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should update user data', async (done) => {
    const service : DataStoreService = TestBed.get(DataStoreService);

    const existUserData : UserData = {
      firstName: 'Emily',
      lastName: 'Anthony',
      recordPreset: RecordPreset.HEART_FAILURE,
      newUser: true
    }

    service.createOrReplaceUserData(existUserData).subscribe({ next(x) {
      console.log(x);
      service.updateUserData({firstName: 'Charlie', lastName: 'Chaplin'}).subscribe({ next(y) {
        expect(y).not.toEqual(x);

        expect(y.firstName).not.toEqual(x.firstName);

        expect(y.firstName).toEqual('Charlie');

        expect(y.lastName).not.toEqual(x.lastName);

        expect(y.lastName).toEqual('Chaplin');

        expect(y.recordPreset).toEqual(x.recordPreset);

        expect(y.newUser).toEqual(x.newUser);

        done();
      }});
    }});
  });
});


fdescribe('updateUserData() with nothing', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should do nothing', async (done) => {
    const service : DataStoreService = TestBed.get(DataStoreService);

    const existUserData : UserData = {
      firstName: 'Harry',
      lastName: 'Potter',
      recordPreset: RecordPreset.COMMON_COLD,
      newUser: false
    }

    service.createOrReplaceUserData(existUserData).subscribe({ next(x) {
      service.updateUserData({ }).subscribe({ next(y) {
        expect(y).toEqual(x);
        done();
      }});
    }});
  });
});

fdescribe('updateUserData() with recordPresent and newUser', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should udpate recordPresent and newUser', async (done) => {
    const service : DataStoreService = TestBed.get(DataStoreService);

    const existingUserData: UserData = {
      firstName: 'Mary',
      lastName: 'Poppins',
      recordPreset: RecordPreset.COMMON_COLD,
      newUser: true
    }

    service.createOrReplaceUserData(existingUserData).subscribe({ next(x) {
      console.log('before', x);
      service.updateUserData({recordPreset: RecordPreset.HEART_FAILURE, newUser: false}).subscribe({ next(y) {
        console.log('after', y);
        
        expect(y).not.toEqual(x);

        expect(y.recordPreset).not.toEqual(x.recordPreset);

        expect(y.newUser).not.toEqual(x.newUser);

        expect(y.firstName).toEqual(x.firstName);

        expect(y.lastName).toEqual(y.lastName);

        expect(y.recordPreset).toEqual(RecordPreset.HEART_FAILURE);

        expect(y.newUser).toEqual(false);

        done();
      }});
    }});
  });
});
