import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DailyDetailUpperComponent } from './daily-detail-upper.component';

describe('DailyDetailUpperComponent', () => {
  let component: DailyDetailUpperComponent;
  let fixture: ComponentFixture<DailyDetailUpperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDetailUpperComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDetailUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
