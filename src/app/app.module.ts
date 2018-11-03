import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { A11yModule } from './a11y/a11y.module';
import { RadioOptionDirective } from './radio-option.directive';

@NgModule({
  declarations: [
    AppComponent,
    RadioOptionDirective
  ],
  imports: [
    BrowserModule,
    A11yModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
