import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabCategoryPage } from './tab-category.page';

describe('TabCategoryPage', () => {
  let component: TabCategoryPage;
  let fixture: ComponentFixture<TabCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabCategoryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
