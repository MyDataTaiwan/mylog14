import { TestBed } from '@angular/core/testing';
import { CouponService } from './coupon.service';

describe('CouponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouponService = TestBed.inject(CouponService);
    expect(service).toBeTruthy();
  });
});
