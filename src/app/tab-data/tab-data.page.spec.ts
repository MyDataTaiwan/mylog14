import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDataPage } from './tab-data.page';

@Component({
  selector: 'app-tab-data',
  template: ''
})
class MockDiaryPage {
}

describe('tabDataPage', () => {
  let component: TabDataPage;
  let fixture: ComponentFixture<TabDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabDataPage,
        MockDiaryPage,
      ],
      imports: [
        IonicModule.forRoot(),
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
