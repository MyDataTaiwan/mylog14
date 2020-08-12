import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';

import { AddRecordFieldItemComponent } from './add-record-field-item.component';

describe('AddRecordFieldItemComponent', () => {
  let component: AddRecordFieldItemComponent;
  let fixture: ComponentFixture<AddRecordFieldItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecordFieldItemComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecordFieldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
