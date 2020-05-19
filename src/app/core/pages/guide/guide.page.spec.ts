import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuidePage } from './guide.page';

describe('GuidePage', () => {
  let component: GuidePage;
  let fixture: ComponentFixture<GuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
