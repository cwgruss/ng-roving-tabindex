import { Directive, ElementRef, Renderer2, HostListener, ChangeDetectorRef } from '@angular/core';
import { ILisKeyManagerOption } from './a11y/roving-tabindex';
import { SPACE, ENTER } from './util/keycodes';

export abstract class Option implements ILisKeyManagerOption {
  isDisabled: boolean;
  abstract focus(): void;
}

@Directive({
  selector: '[radio-option]',
  host: {
    'role': 'radio',
    '[attr.aria-checked]' : 'isChecked',
  }
})
export class RadioOptionDirective extends Option {
  private _isChecked: boolean;

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(isChecked: boolean) {
    this._isChecked = isChecked;
    this._changeDetector.detectChanges();
  }

  get isFocused(): boolean {
    return this._isChecked;
  }

  set isFocused(isFocused: boolean) {
    if (isFocused) {
      this._renderer.setAttribute(this._el.nativeElement, 'tabindex', '0');
    } else {
      this._renderer.setAttribute(this._el.nativeElement, 'tabindex', '-1');
    }
    this._changeDetector.detectChanges();
  }

  focus(): void {
    this._el.nativeElement.focus();
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _changeDetector: ChangeDetectorRef) {
    super();
    this._isChecked = false;
    this._renderer.setAttribute(this._el.nativeElement, 'tabindex', '-1');
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    const keycode = event.keyCode;
    switch(keycode) {
      case SPACE:
      case ENTER: {
        this.isChecked = true;
      }
    }
  }

}
