import { OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs"
import { takeWhile } from "rxjs/operators";
import { EffectInterface } from "../interfaces/effect.interface";
import { EffectResultInterface } from "../interfaces/effect-result.interface";
import { EffectDispatchInterface } from "../interfaces/effect-dispatch.interface";

export class FormEffects implements OnDestroy {

    /**
     * @description
     * Holds the subject for effects subscription
     * @private
     */
    private readonly _effectsSubject = new Subject()

    /**
     * @description Holds the configuration for effects
     * @private
     * @type {EffectInterface}
     */
    private _effects: EffectInterface

    /**
     * @description
     * Holds all predicate evaluation results
     * @type {EffectResultInterface}
     */
    private _results: EffectResultInterface

    /**
     * @description
     * Flag to check if component 
     * still exists in DOM
     * @private
     */
    private _isAlive: boolean = true

    /**
     * Creates an instance of FormEffects
     * @param {EffectInterface} effects
     */
    constructor(effects: EffectInterface) {

        this._effects = effects
        this._results = {}

        this.subscription
            .pipe(
                takeWhile(() => this._isAlive)
            )
            .subscribe(
                effect => this.update(effect)
            )
    }

    /**
     * @description
     * Angular destroy lifecycle hook
     */
    ngOnDestroy(): void {
        this._isAlive = false
    }

    get subscription(): Observable<any> {
        return this._effectsSubject.asObservable()
    }

    /**
     * @description
     * Getter for predicate results
     * @param {string} key
     * @returns {any}
     */
    get(key: string): any {

        if (!this._results)
            return

        return this._results[key]
    }

    /**
     * @description
     * Alerts the subscribers of 
     * new form control change
     * @param {EffectInterface} effect
     */
    notify(effect: EffectInterface): void {
        this._effectsSubject.next(effect)
    }

    /**
     * @description
     * Takes predicate functions from 
     * effects and save states to values
     */
    update(effectDispatch: EffectDispatchInterface): void {

        if (!effectDispatch) {
            console.error('An effect dispatch must be provided to update values')
            return
        }

        effectDispatch.keys.forEach(
            key => this.updateResultForKey(key, effectDispatch.value)
        )
    }

    /**
     * @description
     * Takes a key and updates the result
     * for the provided predicate function
     * @private
     * @param {string} key
     * @param {any} value
     */
    private updateResultForKey(key: string, value: any): void {

        const predicate = this._effects[key]

        if (!predicate) {
            console.warn(`No predicate was found for key: ${key}`)
            return
        }

        this._results[key] = predicate(value)
    }

}  