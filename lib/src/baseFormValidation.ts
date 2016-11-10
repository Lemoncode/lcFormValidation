import {} from 'core-js';
import { IValidationEngine, ValidationEngine } from './validationEngine';
import { FieldValidationResult, FormValidationResult } from './entities';
import { consts } from './consts';

export class BaseFormValidation {
    _validationEngine: IValidationEngine;

    constructor() {
        this._validationEngine = new ValidationEngine();
    }

    public validateField(vm: any, key: string, value: any, filter : any = consts.defaultFilter): Promise<FieldValidationResult> {
        return this._validationEngine.triggerFieldValidation(vm, key, value, filter);
    }

    public validateForm(vm: any): Promise<FormValidationResult> {
        return this._validationEngine.validateFullForm(vm);
    }
}
