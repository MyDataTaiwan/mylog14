import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';

import { SharePopoverPage } from './share-popover.page';

describe('SharePopoverPage', () => {
  let component: SharePopoverPage;
  let fixture: ComponentFixture<SharePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharePopoverPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
