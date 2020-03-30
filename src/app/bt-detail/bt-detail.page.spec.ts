import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtDetailPage } from './bt-detail.page';

describe('BtDetailPage', () => {
  let component: BtDetailPage;
  let fixture: ComponentFixture<BtDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
