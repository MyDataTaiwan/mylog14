import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategorySymptomsPage } from './category-symptoms.page';
import { RouterModule } from '@angular/router';

describe('CategorySymptomsPage', () => {
  let component: CategorySymptomsPage;
  let fixture: ComponentFixture<CategorySymptomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySymptomsPage ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorySymptomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
