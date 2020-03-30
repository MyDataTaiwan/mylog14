import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewByDatePage } from './view-by-date.page';

describe('ViewByDatePage', () => {
  let component: ViewByDatePage;
  let fixture: ComponentFixture<ViewByDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewByDatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewByDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
