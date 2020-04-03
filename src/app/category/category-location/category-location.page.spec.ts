import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryLocationPage } from './category-location.page';
import { RouterModule } from '@angular/router';

describe('CategoryLocationPage', () => {
  let component: CategoryLocationPage;
  let fixture: ComponentFixture<CategoryLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLocationPage ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
