import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDetailConditionPage } from './date-detail-condition.page';

describe('DateDetailConditionPage', () => {
  let component: DateDetailConditionPage;
  let fixture: ComponentFixture<DateDetailConditionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDetailConditionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDetailConditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
