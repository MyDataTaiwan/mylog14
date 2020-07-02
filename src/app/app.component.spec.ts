import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { TranslateConfigService } from './core/services/translate-config.service';

describe('AppComponent', () => {

  let platformIsSpy, platformSpy, translateConfigSpy;

  beforeEach(async(() => {
    platformIsSpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { is: platformIsSpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: TranslateConfigService, useValue: translateConfigSpy },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.is).toHaveBeenCalled();
  });
});
