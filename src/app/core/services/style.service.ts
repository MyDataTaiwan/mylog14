import { ApplicationRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(
    private readonly applicationRef: ApplicationRef,
  ) { }

  setFontSize(fontSize: string) {
    const nodeList = document.querySelectorAll('ion-label h3') as NodeListOf<HTMLElement>;
    console.log(nodeList);
    let size = '20px';
    switch (fontSize) {
      case 'small':
        size = '14px';
        break;
      case 'medium':
        size = '20px';
        break;
      case 'large':
        size = '26px';
        break;
      default:
        break;
    }
    nodeList.forEach(el => {
      el.style.setProperty('font-size', size, 'important');
      this.applicationRef.tick();
    });
    const htmlRoot: HTMLElement = document.getElementsByTagName('html')[0] as HTMLElement;
    if (htmlRoot != null) {
      htmlRoot.style.fontSize = size;
    }
  }
}
