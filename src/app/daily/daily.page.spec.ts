import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DailyPhotosModule } from './daily-photos/daily-photos.module';
import { DailyRecordsModule } from './daily-records/daily-records.module';
import { DailySummaryModule } from './daily-summary/daily-summary.module';
import { DailyPage } from './daily.page';

describe('DailyPage', () => {
  let component: DailyPage;
  let fixture: ComponentFixture<DailyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyPage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        DailySummaryModule,
        DailyRecordsModule,
        DailyPhotosModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
