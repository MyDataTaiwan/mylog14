import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategorizeFinishPage } from './categorize-finish.page';

describe('CategorizeFinishPage', () => {
  let component: CategorizeFinishPage;
  let fixture: ComponentFixture<CategorizeFinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorizeFinishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorizeFinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
