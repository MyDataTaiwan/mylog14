import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryLocationPage } from './category-location.page';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SafeUrlPipe } from 'src/app/core/pipes/safe-url.pipe';

describe('CategoryLocationPage', () => {
  let component: CategoryLocationPage;
  let fixture: ComponentFixture<CategoryLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLocationPage, SafeUrlPipe ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
