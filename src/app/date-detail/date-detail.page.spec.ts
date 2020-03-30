import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDetailPage } from './date-detail.page';

describe('DateDetailPage', () => {
  let component: DateDetailPage;
  let fixture: ComponentFixture<DateDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
