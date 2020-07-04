import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';
import { OverviewModule } from 'src/app/overview/overview.module';

import { IonicModule } from '@ionic/angular';

import { TabDataPage } from './tab-data.page';

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
        OverviewModule
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
