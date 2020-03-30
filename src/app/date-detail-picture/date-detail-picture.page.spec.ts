import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDetailPicturePage } from './date-detail-picture.page';

describe('DateDetailPicturePage', () => {
  let component: DateDetailPicturePage;
  let fixture: ComponentFixture<DateDetailPicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDetailPicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDetailPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
