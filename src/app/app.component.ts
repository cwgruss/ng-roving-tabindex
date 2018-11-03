import { Component } from '@angular/core';

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
  ]
}
