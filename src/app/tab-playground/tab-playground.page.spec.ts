import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabPlaygroundPage } from './tab-playground.page';

describe('TabPlaygroundPage', () => {
  let component: TabPlaygroundPage;
  let fixture: ComponentFixture<TabPlaygroundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPlaygroundPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPlaygroundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
