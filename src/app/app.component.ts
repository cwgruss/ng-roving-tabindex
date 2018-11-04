import { Component, ContentChildren, QueryList, AfterViewInit, ViewChildren, HostListener } from '@angular/core';
import { RovingTabindex } from './a11y/roving-tabindex/roving-tabindex';

export class RadioOption {
  constructor(public label: string, value: string) {}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-roving-tabindex';

  options = [
    new RadioOption('Chicago', 'chicago'),
    new RadioOption('Detroit', 'detroit'),
    new RadioOption('Minneapolis', 'minneapolis')
  ];
}
