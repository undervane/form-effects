import { Directive, Input } from '@angular/core';
import { EffectDispatchInterface } from '../interfaces/effect-dispatch.interface';
import { FormEffects } from '../model/form-effects.type';

@Directive({
  selector: '[formEffects]'
})
export class FormEffectsDirective {

  /**
    * @description
    * Holds the formEffects instance
    * @type {FormEffects}
    */
  @Input()
  formEffects: FormEffects

  constructor() { }

  /**
   * @description
   * When executed, updates the predicate result for provided key 
   * array, and optionally passes the new form control value
   * @param {EffectDispatchInterface} effectDispatch
   */
  notify(effectDispatch: EffectDispatchInterface): void {

    if (!this.formEffects) {
      throw new Error('A FormEffects instance must be provided to update values');
    }

    if (!effectDispatch) {
      throw new Error(`Can't execute update if EffectDispatch is not provided`);
    }

    this.formEffects.update(effectDispatch)
  }

}