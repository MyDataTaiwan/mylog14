import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocationService = TestBed.inject(GeolocationService);
    expect(service).toBeTruthy();
  });
});

fdescribe('getPosition', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('method should be defined', () => {
    const service: GeolocationService = TestBed.inject(GeolocationService);

    expect(service.getPosition()).toBeDefined();
  });
});

fdescribe('getPosition', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be called', () => {
    const geolocation = new GeolocationService();
    spyOn(geolocation, 'getPosition');
    geolocation.getPosition();
    expect(geolocation.getPosition).toHaveBeenCalled();
  });
});

describe('watchPosition with default options', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be the same as getPosition', async (done) => {
    const service: GeolocationService = TestBed.inject(GeolocationService);

    service.watchPosition().subscribe(x => {
      service.getPosition().subscribe(y => {
        expect(x).toEqual(y);
        done();
      });
    });
  });
});

describe('private method isCachedPositionValid', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be defined', () => {
    const geolocation = new GeolocationService();
    const spyIsCachedPositionValid = spyOn<any>(geolocation, 'isCachedPositionValid');
    expect(spyIsCachedPositionValid).toBeDefined();
  });
});

describe('isCachedPositionValid', () => {
  let geolocation;
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    geolocation = new GeolocationService();
    spyOn<any>(geolocation, 'isCachedPositionValid').and.callThrough();
    geolocation.getPosition();
  });

  it('should be called in getPosition', () => {
    expect(geolocation.isCachedPositionValid).toHaveBeenCalled();
  });
});

