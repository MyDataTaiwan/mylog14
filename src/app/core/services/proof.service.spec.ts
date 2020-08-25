import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProofService } from './proof.service';
import { GeolocationService } from './geolocation.service';

describe('ProofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProofService = TestBed.inject(ProofService);
    expect(service).toBeTruthy();
  });
});

fdescribe('private method getLocationProof', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be defined', () => {
    const spyGetLocationProof = spyOn<any>(ProofService.prototype, 'getLocationProof');

    expect(spyGetLocationProof).toBeDefined();
  });
});

fdescribe('createProofWithoutLocation()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should return proof', () => {
    const service: ProofService = TestBed.inject(ProofService);
    expect(service.createProofWithoutLocation().timestamp).toEqual(Date.now());
  });
});

fdescribe('createProof()', () => {

  let mockGeolocationService;

  beforeEach(() => {
    mockGeolocationService = jasmine.createSpyObj(['getPosition']);
    mockGeolocationService.getPosition.and.returnValue(of({coords: {latitude: 123, longitude: 123, accuracy: 123}}));
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: GeolocationService, useValue: mockGeolocationService }],
  }));

  it('should return proof', (done: DoneFn) => {
    const service: ProofService = TestBed.inject(ProofService);

    service.createProof().subscribe(x => {
      expect(x.location.longitude).toEqual(123);
      expect(x.location.latitude).toEqual(123);
      expect(x.location.accuracy).toEqual(123);
      done();
    });
  });
});
