import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryPendingPage } from './category-pending.page';
import { RouterModule } from '@angular/router';

describe('CategoryPendingPage', () => {
  let component: CategoryPendingPage;
  let fixture: ComponentFixture<CategoryPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPendingPage ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
