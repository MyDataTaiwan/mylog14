import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoService = TestBed.inject(PhotoService);
    expect(service).toBeTruthy();
  });
});

fdescribe('getCameraPhoto', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be be defined', () => {
    const newPhoto = new PhotoService();
    const spyGetCameraPhoto = spyOn<any>(newPhoto, 'getCameraPhoto');
    expect(spyGetCameraPhoto).toBeDefined();
  });
});

fdescribe('getCameraPhoto', () => {

  let photo;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    photo = new PhotoService();
    spyOn<any>(photo, 'getCameraPhoto').and.callThrough();
    photo.create();
  });

  it('should be have been called in create method', () => {
    expect(photo.getCameraPhoto).toHaveBeenCalled();
  });
});

fdescribe('create()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be defined', () => {
    const newPhoto = new PhotoService();
    const spyCreate = spyOn(newPhoto, 'create');
    expect(spyCreate).toBeDefined();
  });
});

fdescribe('create()', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be called', async () => {
    const newPhoto = new PhotoService();
    spyOn(newPhoto, 'create');
    newPhoto.create();
    expect(newPhoto.create).toHaveBeenCalled();
  });
});


