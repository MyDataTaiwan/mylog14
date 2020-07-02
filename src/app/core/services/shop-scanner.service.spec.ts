import { TestBed } from '@angular/core/testing';

import { ShopScannerService } from './shop-scanner.service';

describe('ShopScannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopScannerService = TestBed.get(ShopScannerService);
    expect(service).toBeTruthy();
  });
});
