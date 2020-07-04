import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';

import { DailyDetailRecordsComponent } from './daily-detail-records.component';

describe('DailyDetailRecordsComponent', () => {
  let component: DailyDetailRecordsComponent;
  let fixture: ComponentFixture<DailyDetailRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDetailRecordsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDetailRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
