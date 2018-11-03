import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RovingTabindexDirective } from './roving-tabindex/roving-tabindex.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RovingTabindexDirective],
  exports: [RovingTabindexDirective]
})
export class A11yModule { }
