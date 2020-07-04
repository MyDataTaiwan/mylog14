import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import {
  TranslateTestingModule,
} from 'src/app/core/tests/translate-testing/translate-testing.module';

import { IonicModule } from '@ionic/angular';

import {
  DailyDetailPhotosModule,
} from './daily-detail-photos/daily-detail-photos.module';
import {
  DailyDetailRecordsModule,
} from './daily-detail-records/daily-detail-records.module';
import {
  DailyDetailUpperModule,
} from './daily-detail-upper/daily-detail-upper.module';
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
        DailyDetailRecordsModule,
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
