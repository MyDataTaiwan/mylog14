import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConditionCardPage } from './condition-card.page';

describe('ConditionCardPage', () => {
  let component: ConditionCardPage;
  let fixture: ComponentFixture<ConditionCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
