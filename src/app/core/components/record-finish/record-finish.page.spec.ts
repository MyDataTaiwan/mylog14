import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RecordFinishPage } from './record-finish.page';

describe('RecordFinishPage', () => {
  let component: RecordFinishPage;
  let fixture: ComponentFixture<RecordFinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordFinishPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordFinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
