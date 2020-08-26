import { TestBed } from '@angular/core/testing';
import { FileSystemService } from './file-system.service';
import { FilesystemDirectory, FilesystemEncoding, Plugins } from '@capacitor/core';

const { Filesystem } = Plugins;

describe('FileSystemService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be create', () => {
    const service: FileSystemService = TestBed.inject(FileSystemService);
    expect(service).toBeTruthy();
  });
});

fdescribe('getFileHash', () => {

  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Filesystem.deleteFile({
    path: 'file.txt',
    directory: FilesystemDirectory.Data
  }));
  it('Hash should match', async () => {
    const service: FileSystemService = TestBed.inject(FileSystemService);
    await Filesystem.writeFile({
                path: 'file.txt',
                data: 'This is a test',
                directory: FilesystemDirectory.Data,
                encoding: FilesystemEncoding.UTF8
            });

    const expectedhashCode = 'c7be1ed902fb8dd4d48997c6452f5d7e509fbcdbe2808b16bcf4edce4c07d14e';
    service.getFileHash('file.txt', FilesystemDirectory.Data).subscribe(x => {
      expect(x).toBe(expectedhashCode);
    });
  });
});

fdescribe('getFileHash', () => {

  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Filesystem.deleteFile({
    path: 'file.txt',
    directory: FilesystemDirectory.Documents
  }));
  it('Hash should match have same length', async () => {
    const service: FileSystemService = TestBed.inject(FileSystemService);
    await Filesystem.writeFile({
                path: 'file.txt',
                data: 'This is a test',
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
            });

    const expectedhashCodeLength = 64;
    service.getFileHash('file.txt', FilesystemDirectory.Documents).subscribe(x => {
      expect(x.length).toBe(expectedhashCodeLength);
    });
  });
});

fdescribe('getJsonData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(async () => await Filesystem.deleteFile({
    path: 'file.txt',
    directory: FilesystemDirectory.Documents
  }));

  it('Json Data should match', async () => {
    const service: FileSystemService = TestBed.inject(FileSystemService);

    await Filesystem.writeFile({
                path: 'file.txt',
                data: JSON.stringify({color: 'red', value: '#f00'}),
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
          });

    const expectedJsonData = '{"color":"red","value":"#f00"}';
    service.getJsonData('file.txt', true, FilesystemDirectory.Documents).subscribe(x => {
      expect(JSON.stringify(x)).toBe(expectedJsonData);
    });
  });
});

fdescribe('saveJsonData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Json Data should save', (done) => {
    const service: FileSystemService = TestBed.inject(FileSystemService);

    const data = {timestamp : '2017-11-27T09:10:00'};

    const expectedSavedJsonData = '2017-11-27T09:10:00.json';

    service.saveJsonData(data, FilesystemDirectory.Documents).subscribe(async x => {
      const output = await Filesystem.readFile({
        path: expectedSavedJsonData,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
      expect(data).toEqual(JSON.parse(output.data));
      done();
    });
  });
});

