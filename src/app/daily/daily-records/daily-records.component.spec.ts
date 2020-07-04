import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';

import { DailyRecordsComponent } from './daily-records.component';

describe('DailyRecordsComponent', () => {
  let component: DailyRecordsComponent;
  let fixture: ComponentFixture<DailyRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyRecordsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
