import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImgViewerPage } from './img-viewer.page';

describe('ImgViewerPage', () => {
  let component: ImgViewerPage;
  let fixture: ComponentFixture<ImgViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
