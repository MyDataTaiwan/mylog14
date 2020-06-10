import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailPopoverPage } from './email-popover.page';

describe('EmailPopoverPage', () => {
  let component: EmailPopoverPage;
  let fixture: ComponentFixture<EmailPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
