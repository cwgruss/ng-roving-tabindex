import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent, RadioTemplateDirective, RadioOptionDirective } from './radios/radio.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RadioGroupComponent, RadioTemplateDirective, RadioOptionDirective],
  exports: [RadioGroupComponent, RadioTemplateDirective, RadioOptionDirective]
})
export class ExamplesModule { }
