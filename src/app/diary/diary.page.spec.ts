import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiaryPage } from './diary.page';

describe('DiaryPage', () => {
  let component: DiaryPage;
  let fixture: ComponentFixture<DiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
