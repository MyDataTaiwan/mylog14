import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NamePopoverPage } from './name-popover.page';

describe('NamePopoverPage', () => {
  let component: NamePopoverPage;
  let fixture: ComponentFixture<NamePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamePopoverPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NamePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
