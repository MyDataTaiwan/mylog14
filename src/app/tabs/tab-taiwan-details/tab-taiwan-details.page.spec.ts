import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabTaiwanDetailsPage } from './tab-taiwan-details.page';

describe('TabTaiwanDetailsPage', () => {
  let component: TabTaiwanDetailsPage;
  let fixture: ComponentFixture<TabTaiwanDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTaiwanDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabTaiwanDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
