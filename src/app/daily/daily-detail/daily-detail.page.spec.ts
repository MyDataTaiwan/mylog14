import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyDetailPage } from './daily-detail.page';

describe('DailyDetailPage', () => {
  let component: DailyDetailPage;
  let fixture: ComponentFixture<DailyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
