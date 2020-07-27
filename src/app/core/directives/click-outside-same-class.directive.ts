import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutsideSameClass]'
})
export class ClickOutsideSameClassDirective {
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private readonly elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the elements with the same class
    if (targetElement && !this.elementRef.nativeElement.classList.contains(targetElement.className)) {
      this.clickOutside.emit(event);
    }
  }
}
