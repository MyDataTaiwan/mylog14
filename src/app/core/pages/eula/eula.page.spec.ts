import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EulaPage } from './eula.page';

describe('EulaPage', () => {
  let component: EulaPage;
  let fixture: ComponentFixture<EulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
