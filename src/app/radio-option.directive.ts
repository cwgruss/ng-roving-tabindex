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
@Directive({
  selector: '[radio-option]',
  host: {
    'role': 'radio',
    '[attr.aria-checked]' : 'isChecked',
  }
})
export class RadioOptionDirective extends RadioOption {
  private _isChecked: boolean;

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(isChecked: boolean) {
    this._isChecked = isChecked;
    this._changeDetector.detectChanges();
  }


  constructor(private _el: ElementRef, private _renderer: Renderer2, private _changeDetector: ChangeDetectorRef) {
    super(_el);
    this._isChecked = false;
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    const keycode = event.keyCode;
    switch (keycode) {
      case SPACE:
      case ENTER: {
        this.isChecked = true;
      }
    }
  }

}
