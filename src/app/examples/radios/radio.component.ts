import { Component, OnInit, Directive, ContentChild, TemplateRef, Input, ViewChildren, HostListener, ElementRef, Renderer2, ChangeDetectorRef, QueryList } from '@angular/core';
import { SPACE, ENTER } from 'src/app/util/keycodes';
import { RovingTabindex, TabbableOption } from 'src/app/a11y/roving-tabindex/roving-tabindex';

@Directive({
  selector: '[radio]',
}) export class RadioTemplateDirective {}

@Directive({
  selector: '[radio-option]',
  host: {
    'role': 'radio',
    'tabindex': '0'
    '[attr.aria-checked]' : 'isChecked',
    '[class.is-active]': 'isChecked'
  }
})
export class RadioOptionDirective extends TabbableOption {
  private _isChecked: boolean;

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(isChecked: boolean) {
    this._isChecked = isChecked;
    this._changeDetector.detectChanges();
  }


  toggle(): void {
    this.isChecked = !this.isChecked;
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
        this.toggle();
      }
    }
  }

}

@Component({
  selector: 'radio-group',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioGroupComponent implements OnInit {
  @ContentChild(RadioTemplateDirective, {read: TemplateRef}) optionTemplate: TemplateRef<RadioTemplateDirective>;
  @ViewChildren(RadioOptionDirective) radioOptions = new QueryList<RadioOptionDirective>();
  @Input() items: any[];

  private _manager: RovingTabindex<RadioOptionDirective>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.radioOptions) {
      this._manager = new RovingTabindex(this.radioOptions);
      this._manager.change.subscribe((option: RadioOptionDirective) => {
        this.radioOptions.forEach(option => option.isChecked = false);
        option.isChecked = true;
      });
    }
  }

  public handleKeydown(event: KeyboardEvent) {
    this._manager.handleKeyboard(event);
  }

}
