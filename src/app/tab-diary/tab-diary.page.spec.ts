import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDiaryPage } from './tab-diary.page';

@Component({
  selector: 'app-diary',
  template: ''
})
class MockDiaryPage {
}

describe('tabDiaryPage', () => {
  let component: TabDiaryPage;
  let fixture: ComponentFixture<TabDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TabDiaryPage,
        MockDiaryPage,
      ],
      imports: [
        IonicModule.forRoot(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
