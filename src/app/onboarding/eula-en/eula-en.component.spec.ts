import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EulaEnComponent } from './eula-en.component';

describe('EulaEnComponent', () => {
  let component: EulaEnComponent;
  let fixture: ComponentFixture<EulaEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulaEnComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EulaEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
