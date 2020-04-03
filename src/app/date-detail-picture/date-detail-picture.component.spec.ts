import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateDetailPictureComponent } from './date-detail-picture.component';

describe('DateDetailPictureComponent', () => {
  let component: DateDetailPictureComponent;
  let fixture: ComponentFixture<DateDetailPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateDetailPictureComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateDetailPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
