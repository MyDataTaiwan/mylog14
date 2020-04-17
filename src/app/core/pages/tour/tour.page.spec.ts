import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TourPage } from './tour.page';

describe('TourPage', () => {
  let component: TourPage;
  let fixture: ComponentFixture<TourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
