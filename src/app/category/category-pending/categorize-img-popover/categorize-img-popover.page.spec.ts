import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategorizeImgPopoverPage } from './categorize-img-popover.page';

describe('CategorizeImgPopoverPage', () => {
  let component: CategorizeImgPopoverPage;
  let fixture: ComponentFixture<CategorizeImgPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorizeImgPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorizeImgPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
