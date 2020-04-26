import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabCouponPage } from './tab-coupon.page';

describe('TabCouponPage', () => {
  let component: TabCouponPage;
  let fixture: ComponentFixture<TabCouponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCouponPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabCouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
