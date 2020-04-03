import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabTaiwanPage } from './tab-taiwan.page';

describe('TabTaiwanPage', () => {
  let component: TabTaiwanPage;
  let fixture: ComponentFixture<TabTaiwanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTaiwanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabTaiwanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
