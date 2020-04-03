import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDetailConditionComponent } from './date-detail-condition.component';

describe('DateDetailConditionComponent', () => {
  let component: DateDetailConditionComponent;
  let fixture: ComponentFixture<DateDetailConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateDetailConditionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDetailConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
