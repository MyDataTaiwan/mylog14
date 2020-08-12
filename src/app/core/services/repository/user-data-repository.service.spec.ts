import { TestBed } from '@angular/core/testing';

import { Plugins } from '@capacitor/core';

import { UserData } from '../../interfaces/user-data';
import { UserDataRepositoryService } from './user-data-repository.service';

const { Storage } = Plugins;


describe('UserDataRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataRepositoryService = TestBed.inject(UserDataRepositoryService);
    expect(service).toBeTruthy();
  });
});

fdescribe('get() if no previous saved data', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should fail', (done) => {
    const service: UserDataRepositoryService = TestBed.inject(UserDataRepositoryService);

    const user: UserData = {
      newUser: true,
      firstName: 'john',
      lastName: 'smith',
      dataTemplateName: 'commonCold',
    };

    const expectedOutput = JSON.stringify(user);

    service.get().subscribe(x => {
      expect(JSON.stringify(x)).not.toEqual(expectedOutput);
    });
    done();
  });
});

fdescribe('save()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(() => Storage.clear());

  it('should save user data', (done) => {
    const service: UserDataRepositoryService = TestBed.inject(UserDataRepositoryService);

    const user: UserData = {
      newUser: true,
      firstName: 'john',
      lastName: 'smith',
      dataTemplateName: 'commonCold',
    };

    const expectedOutput = JSON.stringify(user);

    service.save(user).subscribe(x => {
      expect(JSON.stringify(x)).toEqual(expectedOutput);
    });
    done();
  });
});

fdescribe('get() if there is saved data', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(() => Storage.clear());

  it('should get user data', (done) => {
    const service: UserDataRepositoryService = TestBed.inject(UserDataRepositoryService);

    const user: UserData = {
      newUser: true,
      firstName: 'john',
      lastName: 'smith',
      dataTemplateName: 'commonCold',
    };

    service.save(user).subscribe(x => {
      service.get().subscribe(y => {
        expect(JSON.stringify(y)).toEqual(JSON.stringify(x));
      });
    });
    done();
  });
});
