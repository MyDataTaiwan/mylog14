import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DailyOverviewModule } from 'src/app/daily/daily-overview/daily-overview.module';
import { TabDataPage } from './tab-data.page';
import { CoreModule } from 'src/app/core/core.module';

describe('tabDataPage', () => {
  let component: TabDataPage;
  let fixture: ComponentFixture<TabDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabDataPage,
      ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        CoreModule,
        DailyOverviewModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
