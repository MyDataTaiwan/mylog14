import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyDetailPhotosComponent } from './daily-detail-photos.component';

describe('DailyDetailPhotosComponent', () => {
  let component: DailyDetailPhotosComponent;
  let fixture: ComponentFixture<DailyDetailPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDetailPhotosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDetailPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
