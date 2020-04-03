import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDataPage } from './tab-data.page';
import { MainHeaderModule } from 'src/app/core/components/main-header/main-header.module';
import { DailyOverviewModule } from 'src/app/daily/daily-overview/daily-overview.module';
import { CategoryOverviewModule } from 'src/app/category/category-overview/category-overview.module';
import { RouterModule } from '@angular/router';

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
        MainHeaderModule,
        DailyOverviewModule,
        CategoryOverviewModule,
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
