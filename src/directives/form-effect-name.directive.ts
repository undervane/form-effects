import { Directive, Input, OnDestroy } from "@angular/core"
import { NgControl } from "@angular/forms"
import { distinctUntilChanged, debounceTime, takeWhile } from "rxjs/operators"
import { FormEffectsDirective } from "./form-effects.directive"
import { Subscription } from "rxjs"

@Directive({ selector: '[formEffectName]' })
export class FormEffectNameDirective implements OnDestroy {

    /**
     * @description
     * Setter for effect key names
     */
    @Input()
    set formEffectName(keys: string | string[]) {
        this.setupEffectKeys(keys)
        this.subscribeToFormControl()
    }

    /**
     * @description
     * Holds all keys for effect
     * @private
     * @type {string[]}
     */
    private _effectKeys: string[] = []

    /**
     * @description
     * Holds the subscription for 
     * the form control value changes
     * @private
     * @type {Subscription}
     */
    private _controlSubscription: Subscription

    /**
     * @description
     * Flag to check if component 
     * still exists in DOM
     * @private
     */
    private _isAlive = true

    /**
     * Creates an instance of FormEffectNameDirective.
     * @param {FormEffectsDirective} formEffectsDirective
     * @param {NgControl} formControl
     */
    constructor(
        private formEffectsDirective: FormEffectsDirective,
        private formControl: NgControl
    ) { }

    /**
     * @description
     * Angular destroy lifecycle hook
     */
    ngOnDestroy(): void {
        this._isAlive = false
    }

    /**
     * @description
     * Executes logic to subscribe to form control value 
     * changes, and notify parent form effect of any modification
     * @private
     */
    private subscribeToFormControl(): void {

        if (this._controlSubscription || !this.formControl)
            return

        this._controlSubscription = this.formControl.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(200),
                takeWhile(() => this._isAlive)
            )
            .subscribe(
                value => this.formEffectsDirective.notify({ keys: this._effectKeys, value })
            )
    }

    /**
     * @description
     * Sets the effect keys from array or string
     * @private
     * @param {(string | string[])} keys
     */
    private setupEffectKeys(keys: string | string[]) {
        Array.isArray(keys) ? this._effectKeys = keys : this._effectKeys.push(keys)
    }

}