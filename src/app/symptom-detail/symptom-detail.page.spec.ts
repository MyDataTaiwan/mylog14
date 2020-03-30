import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymptomDetailPage } from './symptom-detail.page';

describe('SymptomDetailPage', () => {
  let component: SymptomDetailPage;
  let fixture: ComponentFixture<SymptomDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymptomDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
