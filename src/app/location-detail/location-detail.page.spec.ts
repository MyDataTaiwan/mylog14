import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationDetailPage } from './location-detail.page';

describe('LocationDetailPage', () => {
  let component: LocationDetailPage;
  let fixture: ComponentFixture<LocationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
