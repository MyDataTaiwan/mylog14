import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRecordPage } from './add-record.page';

describe('AddRecordPage', () => {
  let component: AddRecordPage;
  let fixture: ComponentFixture<AddRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
