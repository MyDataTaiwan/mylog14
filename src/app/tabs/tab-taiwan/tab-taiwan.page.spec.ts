import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabTaiwanPage } from './tab-taiwan.page';
import { MainHeaderModule } from 'src/app/core/components/main-header/main-header.module';
import { LottieModule } from 'ngx-lottie';
import { RouterModule } from '@angular/router';

export function playerFactory() {
  return import('lottie-web');
}

describe('TabTaiwanPage', () => {
  let component: TabTaiwanPage;
  let fixture: ComponentFixture<TabTaiwanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTaiwanPage ],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        MainHeaderModule,
        LottieModule.forRoot({ player: playerFactory }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabTaiwanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
