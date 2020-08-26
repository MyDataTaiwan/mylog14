import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EulaZhComponent } from './eula-zh.component';

describe('EulaZhComponent', () => {
  let component: EulaZhComponent;
  let fixture: ComponentFixture<EulaZhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulaZhComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EulaZhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
