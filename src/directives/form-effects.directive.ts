import { Directive, Input } from '@angular/core'
import { FormEffects } from '../model/form-effects.type'
import { EffectDispatchInterface } from '../interfaces/effect-dispatch.interface';

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
      console.error('A FormEffects instance must be provided to update values')
      return
    }

    if (!effectDispatch) {
      console.error(`Can't execute update if EffectDispatch is not provided`)
      return
    }

    this.formEffects.update(effectDispatch)
  }

}