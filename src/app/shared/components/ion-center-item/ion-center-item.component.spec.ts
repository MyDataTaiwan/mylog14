import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonCenterItemComponent } from './ion-center-item.component';

describe('IonCenterItemComponent', () => {
  let component: IonCenterItemComponent;
  let fixture: ComponentFixture<IonCenterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonCenterItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonCenterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
