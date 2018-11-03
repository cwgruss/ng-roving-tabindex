import { Directive, QueryList, OnInit, ViewChildren, AfterViewInit, ContentChildren, HostBinding, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { ListKeyManager, ILisKeyManagerOption } from './list-key-manager';
import { RadioOptionDirective } from 'src/app/radio-option.directive';


@Directive({
  selector: '[roving-tabindex]',
  host: {
    'role': 'radiogroup',
  }
})
export class RovingTabindexDirective implements OnInit, AfterViewInit {
  @ContentChildren(RadioOptionDirective)
  buttons: QueryList<RadioOptionDirective> = new QueryList<RadioOptionDirective>();

  private _manager: ListKeyManager<RadioOptionDirective>;
  private _selectedItem: RadioOptionDirective;
  private _selectedIndex: number;

  @Input()
  set selected(index: number) {
    if (isFinite(index)) {
      this._selectedIndex = index;
    }
  }
  get selected(): number {
    return this._selectedIndex;
  }
  constructor(private _elHost: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() { }


  ngAfterViewInit() {
    this._manager = new ListKeyManager( this.buttons );

    if (this._selectedIndex) {
      this._manager.setSelectedItem(this._selectedIndex);
    } else {
      this._selectedIndex = 0;
      this.buttons.first.focus();
    }


    console.group();
      console.log('MANAGER');
      console.log(this.buttons);
      this._manager.change.subscribe((selected: RadioOptionDirective) => {
        this.buttons.forEach(option => {
          option.isFocused = false;
        });
        selected.isFocused = true;
        selected.focus();
      });
      this._manager.tabOut.subscribe(_ => {
        console.log('tabbed');
      });
    console.groupEnd();
  }

  @HostListener('keydown', ['$event'])
  handleClick(event: KeyboardEvent) {
    this._manager.handleKeyDown(event);
  }
}
