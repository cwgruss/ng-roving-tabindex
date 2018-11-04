import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { A11yModule } from './a11y/a11y.module';
import { ExamplesModule } from './examples/examples.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    A11yModule,
    ExamplesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
