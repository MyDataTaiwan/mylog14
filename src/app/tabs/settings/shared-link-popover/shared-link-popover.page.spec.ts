import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedLinkPopoverPage } from './shared-link-popover.page';

describe('SharedLinkPopoverPage', () => {
  let component: SharedLinkPopoverPage;
  let fixture: ComponentFixture<SharedLinkPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedLinkPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedLinkPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
