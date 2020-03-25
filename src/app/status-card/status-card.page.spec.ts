import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusCardPage } from './status-card.page';

describe('StatusCardPage', () => {
  let component: StatusCardPage;
  let fixture: ComponentFixture<StatusCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
