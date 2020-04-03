import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyDetailSymptomsComponent } from './daily-detail-symptoms.component';

describe('DailyDetailSymptomsComponent', () => {
  let component: DailyDetailSymptomsComponent;
  let fixture: ComponentFixture<DailyDetailSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDetailSymptomsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDetailSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
