import { Directive, ElementRef, Renderer2, HostListener, ChangeDetectorRef } from '@angular/core';
import { SPACE, ENTER } from './util/keycodes';
import { TabbableOption } from './a11y/roving-tabindex/roving-tabindex';

@Directive({
  selector: '[option]'
})
// tslint:disable-next-line:directive-class-suffix
export class RadioOption extends TabbableOption {
  constructor(_el: ElementRef) {
    super(_el);
  }
}
