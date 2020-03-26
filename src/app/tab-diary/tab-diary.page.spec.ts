import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDiaryPage } from './tab-diary.page';

describe('tabDiaryPage', () => {
  let component: TabDiaryPage;
  let fixture: ComponentFixture<TabDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabDiaryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
