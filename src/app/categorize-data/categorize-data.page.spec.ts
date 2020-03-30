import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategorizeDataPage } from './categorize-data.page';

describe('CategorizeDataPage', () => {
  let component: CategorizeDataPage;
  let fixture: ComponentFixture<CategorizeDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorizeDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorizeDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
