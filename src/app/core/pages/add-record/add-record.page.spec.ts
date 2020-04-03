import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRecordPage } from './add-record.page';
import { RouterModule } from '@angular/router';
import { TranslateTestingModule } from '../../tests/translate-testing/translate-testing.module';
import { FormsModule } from '@angular/forms';

describe('AddRecordPage', () => {
  let component: AddRecordPage;
  let fixture: ComponentFixture<AddRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecordPage ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        FormsModule,
        TranslateTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
