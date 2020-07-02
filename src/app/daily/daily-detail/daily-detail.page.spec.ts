import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'src/app/core/tests/translate-testing/translate-testing.module';
import { DailyDetailPhotosModule } from './daily-detail-photos/daily-detail-photos.module';
import { DailyDetailSymptomsModule } from './daily-detail-symptoms/daily-detail-symptoms.module';
import { DailyDetailUpperModule } from './daily-detail-upper/daily-detail-upper.module';
import { DailyDetailPage } from './daily-detail.page';

describe('DailyDetailPage', () => {
  let component: DailyDetailPage;
  let fixture: ComponentFixture<DailyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDetailPage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateTestingModule,
        DailyDetailUpperModule,
        DailyDetailSymptomsModule,
        DailyDetailPhotosModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
