import { Component, ContentChildren, QueryList, AfterViewInit, ViewChildren, HostListener } from '@angular/core';
import { RadioOptionDirective } from './radio-option.directive';
import { RovingTabindex } from './a11y/roving-tabindex/roving-tabindex';

export class RadioOption {
  constructor(public label: string, value: string) {}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-roving-tabindex';
  private _manager: RovingTabindex<RadioOptionDirective>;
  @ViewChildren(RadioOptionDirective) radios = new QueryList<RadioOptionDirective>();

  options = [
    new RadioOption('Chicago', 'chicago'),
    new RadioOption('Detroit', 'detroit'),
    new RadioOption('Minneapolis', 'minneapolis')
  ];

  ngAfterViewInit() {
    if (this.radios) {
      this._manager = new RovingTabindex(this.radios);
      this._manager.select(0);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    this._manager.handleKeyboard(event);
  }
}
