import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDatePage } from './tab-date.page';

@Component({
  selector: 'app-tab-date',
  template: ''
})
class MockDiaryPage {
}

describe('tabDatePage', () => {
  let component: TabDatePage;
  let fixture: ComponentFixture<TabDatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabDatePage,
        MockDiaryPage,
      ],
      imports: [
        IonicModule.forRoot(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
