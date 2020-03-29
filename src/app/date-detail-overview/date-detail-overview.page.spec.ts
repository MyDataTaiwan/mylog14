import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDetailOverviewPage } from './date-detail-overview.page';

describe('DateDetailOverviewPage', () => {
  let component: DateDetailOverviewPage;
  let fixture: ComponentFixture<DateDetailOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDetailOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDetailOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
