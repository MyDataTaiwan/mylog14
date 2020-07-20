import { TestBed } from '@angular/core/testing';

import { UserDataRepositoryService } from './user-data-repository.service';
import { UserData } from '../../interfaces/user-data';
import { RecordPreset } from '../preset.service';


describe('UserDataRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataRepositoryService = TestBed.get(UserDataRepositoryService);
    expect(service).toBeTruthy();
  });
});

fdescribe('get() if no previous saved data', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should fail', (done) => {
    const service: UserDataRepositoryService = TestBed.get(UserDataRepositoryService);

    const user : UserData = {
      newUser: true,
      firstName: 'john',
      lastName: 'smith',
      recordPreset: RecordPreset.COMMON_COLD
    };

    const expectedOutput = JSON.stringify(user);

    service.get().subscribe({next(x) { expect(JSON.stringify(x)).toEqual(expectedOutput); }});
    done();
  });
});

fdescribe('save()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  
  it('should save user data', (done) => {
    const service: UserDataRepositoryService = TestBed.get(UserDataRepositoryService);
    
    const user : UserData = {
      newUser: true,
      firstName: 'john',
      lastName: 'smith',
      recordPreset: RecordPreset.COMMON_COLD
    };

    const expectedOutput = JSON.stringify(user);
    console.log('expected', expectedOutput);

    service.save(user).subscribe( {next(x) {expect(JSON.stringify(x)).toEqual(expectedOutput)}});

    service.get().subscribe( {next(x) { console.log(x) }});

    done();
  })
});

fdescribe('get() if there is saved data', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should get user data', (done) => {
    const service: UserDataRepositoryService = TestBed.get(UserDataRepositoryService);

    const user : UserData = {
      newUser: true,
      firstName: 'john',
      lastName: 'smith',
      recordPreset: RecordPreset.COMMON_COLD
    };

    const expectedOutput = JSON.stringify(user);
    console.log('expected', expectedOutput);

    service.get().subscribe({next(x) { 
      console.log('result', JSON.stringify(x));
      expect(JSON.stringify(x)).toEqual(expectedOutput); }});
    done();
  });
});