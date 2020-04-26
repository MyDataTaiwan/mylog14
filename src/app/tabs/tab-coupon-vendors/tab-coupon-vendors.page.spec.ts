import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabCouponVendorsPage } from './tab-coupon-vendors.page';

describe('TabCouponVendorsPage', () => {
  let component: TabCouponVendorsPage;
  let fixture: ComponentFixture<TabCouponVendorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCouponVendorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabCouponVendorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
