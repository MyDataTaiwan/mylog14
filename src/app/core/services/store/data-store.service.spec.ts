import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { Record } from '../../classes/record';
import { UserData } from '../../interfaces/user-data';
import { RecordService } from '../record.service';
import {
  UserDataRepositoryService,
} from '../repository/user-data-repository.service';
import { DataStoreService } from './data-store.service';

describe('DataStoreService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStoreService = TestBed.inject(DataStoreService);
    expect(service).toBeTruthy();
  });
});

fdescribe('pushData()', () => {
  let mockRecordService;

  beforeEach(() => {
    mockRecordService = jasmine.createSpyObj(['save']);
    mockRecordService.save.and.returnValue(of({ timestamp: 20190619, fields: [] }));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: RecordService, useValue: mockRecordService }],
  }));

  it('should push', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    const record = new Record(20190619);
    service.pushRecord(record, false).subscribe(x => {
      expect(JSON.stringify(x[x.length - 1])).toEqual(JSON.stringify(record));
      done();
    });
  });
});

fdescribe('createOrReplaceUserData()', () => {
  let mockUserDataRepositoryService;
  const userData: UserData = {
    firstName: 'John',
    lastName: 'Smith',
    dataTemplateName: 'commonCold',
    newUser: false,
  };
  beforeEach(() => {
    mockUserDataRepositoryService = jasmine.createSpyObj(['save']);
    mockUserDataRepositoryService.save.and.returnValue(of(userData));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: UserDataRepositoryService, useValue: mockUserDataRepositoryService }],
  }));

  it('should create or replace', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);
    const expectedOutput = JSON.stringify(userData);

    service.createOrReplaceUserData(userData).subscribe(x => {
      expect(JSON.stringify(x)).toEqual(expectedOutput);
      done();
    });
  });
});

fdescribe('createOrReplaceUserData()', () => {
  let mockUserDataRepositoryService;
  const existUserData: UserData = {
    firstName: 'Ronald',
    lastName: 'Weasly',
    dataTemplateName: 'commonCold',
    newUser: true
  };

  const replaceUser: UserData = {
    firstName: 'Percy',
    lastName: 'Weasly',
    dataTemplateName: 'commonCold',
    newUser: false
  };
  beforeEach(() => {
    mockUserDataRepositoryService = jasmine.createSpyObj(['save']);
    mockUserDataRepositoryService.save.withArgs(existUserData).and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.withArgs(replaceUser).and.returnValue(of(replaceUser));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: UserDataRepositoryService, useValue: mockUserDataRepositoryService }],
  }));

  it('should replace', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

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
  let mockUserDataRepositoryService;
  const existUserData: UserData = {
    firstName: 'Emily',
    lastName: 'Anthony',
    dataTemplateName: 'heartFailure',
    newUser: true,
  };

  const replaceUser: UserData = {
    firstName: 'Charlie',
    lastName: 'Chaplin',
    dataTemplateName: 'heartFailure',
    newUser: true,
  };
  beforeEach(() => {
    mockUserDataRepositoryService = jasmine.createSpyObj(['get', 'save']);
    mockUserDataRepositoryService.get.and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.withArgs(existUserData).and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.withArgs(replaceUser).and.returnValue(of(replaceUser));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: UserDataRepositoryService, useValue: mockUserDataRepositoryService }],
  }));

  it('should update user data', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.updateUserData({ firstName: 'Charlie', lastName: 'Chaplin' }).subscribe(y => {
        expect(y).not.toEqual(x);
        expect(y).not.toEqual(existUserData);
        expect(y).toEqual(replaceUser);
        done();
      });
    });
  });
});


fdescribe('updateUserData() with nothing', () => {
  let mockUserDataRepositoryService;
  const existUserData: UserData = {
    firstName: 'Harry',
    lastName: 'Potter',
    dataTemplateName: 'commonCold',
    newUser: false
  };
  beforeEach(() => {
    mockUserDataRepositoryService = jasmine.createSpyObj(['get', 'save']);
    mockUserDataRepositoryService.get.and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.and.returnValue(of(existUserData));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: UserDataRepositoryService, useValue: mockUserDataRepositoryService }],
  }));

  it('should do nothing', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.updateUserData({}).subscribe(y => {
        expect(y).toEqual(x);
        done();
      });
    });
  });
});

fdescribe('updateUserData() with recordPresent and newUser', () => {
  let mockUserDataRepositoryService;
  const existUserData: UserData = {
    firstName: 'Emily',
    lastName: 'Anthony',
    dataTemplateName: 'heartFailure',
    newUser: true,
  };

  const replaceUser: UserData = {
    firstName: 'Charlie',
    lastName: 'Chaplin',
    dataTemplateName: 'heartFailure',
    newUser: true,
  };
  beforeEach(() => {
    mockUserDataRepositoryService = jasmine.createSpyObj(['get', 'save']);
    mockUserDataRepositoryService.get.and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.withArgs(existUserData).and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.withArgs(replaceUser).and.returnValue(of(replaceUser));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: UserDataRepositoryService, useValue: mockUserDataRepositoryService }],
  }));

  it('should update user data', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.updateUserData({ firstName: 'Charlie', lastName: 'Chaplin' }).subscribe(y => {
        expect(y).not.toEqual(x);
        expect(y).not.toEqual(existUserData);
        expect(y).toEqual(replaceUser);
        done();
      });
    });
  });
});


fdescribe('updateUserData() with nothing', () => {
  let mockUserDataRepositoryService;
  const existUserData: UserData = {
    firstName: 'Mary',
    lastName: 'Poppins',
    dataTemplateName: 'commonCold',
    newUser: true
  };
  beforeEach(() => {
    mockUserDataRepositoryService = jasmine.createSpyObj(['get', 'save']);
    mockUserDataRepositoryService.get.and.returnValue(of(existUserData));
    mockUserDataRepositoryService.save.and.returnValue(of(existUserData));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: UserDataRepositoryService, useValue: mockUserDataRepositoryService }],
  }));

  it('should udpate recordPresent and newUser', async (done) => {
    const service: DataStoreService = TestBed.inject(DataStoreService);

    service.createOrReplaceUserData(existUserData).subscribe(x => {
      service.updateUserData({}).subscribe({
        next(y) {
          expect(y).toEqual(x);
          done();
        }
      });
    });
  });
});
