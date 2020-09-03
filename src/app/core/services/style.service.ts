import { ApplicationRef, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { DataStoreService } from './store/data-store.service';

interface FontSizeConfig {
  size1: string;
  size2: string;
  size3: string;
}

interface FontSizeConfigSet {
  small: FontSizeConfig;
  medium: FontSizeConfig;
  large: FontSizeConfig;
}

enum FontSize {
  SIZE1 = 'size1',
  SIZE2 = 'size2',
  SIZE3 = 'size3',
}


@Injectable({
  providedIn: 'root'
})
export class StyleService {

  fontSizeConfigSet: FontSizeConfigSet = {
    small: {
      size1: '18px',
      size2: '14px',
      size3: '10px',
    },
    medium: {
      size1: '22px',
      size2: '18px',
      size3: '14px',
    },
    large: {
      size1: '26px',
      size2: '22px',
      size3: '18px',
    },
  };

  styleConfigs = [
    {
      selectorsList: [
        'ion-text',
      ],
      fontSize: FontSize.SIZE1,
      fontWeight: 500,
    },
    {
      selectorsList: [
        'ion-button',
        'ion-card-title',
        '.input-form',
      ],
      fontSize: FontSize.SIZE2,
      fontWeight: 500,
    },
    {
      selectorsList: [
        'h3',
        'ion-select',
        'ion-select::part(placeholder)::first-letter',
        'ion-datetime',
        'ion-card-subtitle',
        'ion-card-content',
      ],
      fontSize: FontSize.SIZE3,
    },
  ];

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly dataStore: DataStoreService,
  ) { }

  private getFontSizeConfig(fontSize: string): string {
    return this.fontSizeConfigSet[fontSize];
  }

  setFontSize(fontSize: string): void {
    const fontSizeConfig = this.getFontSizeConfig(fontSize);
    this.styleConfigs.forEach(styleConfig => {
      styleConfig.selectorsList.forEach(selectors => {
        const nodeList = document.querySelectorAll(selectors) as NodeListOf<HTMLElement>;
        nodeList.forEach(el => {
          el.style.setProperty('font-size', fontSizeConfig[styleConfig.fontSize], 'important');
          if (styleConfig.fontWeight) {
            el.style.setProperty('font-weight', `${styleConfig.fontWeight}`, 'important');
          }
        });
      });
    });
    this.applicationRef.tick();
  }

  updateFontSize(): Observable<any> {
    return this.dataStore.userData$
      .pipe(
        map(userData => userData.fontSize),
        filter(fontSize => fontSize != null),
        tap(fontSize => this.setFontSize(fontSize)),
      );
  }
}
