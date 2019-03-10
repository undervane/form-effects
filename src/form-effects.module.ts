import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEffectsDirective } from './directives/form-effects.directive';
import { FormEffectNameDirective } from './directives/form-effect-name.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormEffectsDirective,
    FormEffectNameDirective
  ],
  exports: [
    FormEffectsDirective,
    FormEffectNameDirective
  ]
})
export class FormEffectsModule { }
