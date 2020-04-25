import { ClickOutsideSameClassDirective } from './click-outside-same-class.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideSameClassDirective', () => {
  it('should create an instance', () => {
    const elementRef: ElementRef = null; // Mockup not implemented
    const directive = new ClickOutsideSameClassDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
