import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { DomController } from '@ionic/angular';

import { DataStoreService } from './store/data-store.service';

interface StyleConfig {
  variable: string;
  value: string;
}
interface StyleConfigCollection {
  small: StyleConfig[];
  medium: StyleConfig[];
  large: StyleConfig[];
  veryLarge: StyleConfig[];
}


@Injectable({
  providedIn: 'root'
})
export class StyleService {

  // It is intended that small & medium has the same size, since there's only two size [small, large] in this version
  styleConfigCollection: StyleConfigCollection = {
    small: [
      {
        variable: '--font-size-1',
        value: '18pt',
      },
      {
        variable: '--font-size-2',
        value: '18pt',
      },
      {
        variable: '--font-size-3',
        value: '14pt',
      },
    ],
    medium: [
      {
        variable: '--font-size-1',
        value: '22pt',
      },
      {
        variable: '--font-size-2',
        value: '18pt',
      },
      {
        variable: '--font-size-3',
        value: '14pt',
      },
    ],
    large: [
      {
        variable: '--font-size-1',
        value: '26pt',
      },
      {
        variable: '--font-size-2',
        value: '22pt',
      },
      {
        variable: '--font-size-3',
        value: '18pt',
      },
    ],
    veryLarge: [
      {
        variable: '--font-size-1',
        value: '30pt',
      },
      {
        variable: '--font-size-2',
        value: '26pt',
      },
      {
        variable: '--font-size-3',
        value: '22pt',
      },
    ]
  };

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly domCtrl: DomController,
    @Inject(DOCUMENT) private readonly document: Document,
  ) { }

  setFontSize(fontSize: string): void {
    this.domCtrl.write(() => {
      const styleConfigs: StyleConfig[] = this.styleConfigCollection[fontSize] || [];
      styleConfigs.forEach(styleConfig => {
        this.document.documentElement.style.setProperty(styleConfig.variable, styleConfig.value, 'important');
      });
    });
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
