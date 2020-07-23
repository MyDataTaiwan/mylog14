import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

describe('LocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageService = TestBed.inject(LocalStorageService);
    expect(service).toBeTruthy();
  });
});

fdescribe('getData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Storage.clear());

  it('should get data', async () => {
    const service: LocalStorageService = TestBed.inject(LocalStorageService);

    await Storage.set({
      key: 'user',
      value: JSON.stringify({
        id: 1,
        name: 'Max'
      })
    });

    const expectedData = Object({ id: 1, name: 'Max' });
    service.getData('user', '').subscribe(x => {
      expect(x).toEqual(expectedData);
    });
  });
});

fdescribe('setData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Storage.clear());

  it('should set data', async () => {
    const service: LocalStorageService = TestBed.inject(LocalStorageService);

    const data = {key: 'red', value: '#f00'};

    service.setData(data, 'string').subscribe(async x => {
      const {value} = await Storage.get({key: 'string'});
      expect(value).toEqual(JSON.stringify(x));
    });
  });
});


