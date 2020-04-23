import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareFinishPage } from './share-finish.page';

describe('ShareFinishPage', () => {
  let component: ShareFinishPage;
  let fixture: ComponentFixture<ShareFinishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareFinishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareFinishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
