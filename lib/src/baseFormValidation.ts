import { ValidationEngine } from './validationEngine';
import {
  ValidationConstraints,
  FormValidationFunction,
  FieldValidationResult,
  FormValidationResult,
} from './entities';
import { consts } from './consts';

interface FormValidation {
  validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  validateForm(vm: any): Promise<FormValidationResult>;
  isValidationInProgress(): boolean;
  isFormDirty(): boolean;
  isFormPristine(): boolean;
  addFieldValidation(key: string, validation: (value: string, vm: any) => FieldValidationResult, filter?: any): FormValidation;
  addFieldValidationAsync(key: string, validation: (value: string, vm: any) => Promise<FieldValidationResult>, filter?: any): FormValidation;
}

export class BaseFormValidation implements FormValidation {
  private validationEngine: ValidationEngine;
  constructor(validationConstraints: ValidationConstraints) {
    this.validationEngine = new ValidationEngine();
    this.parseValidationConstraints(validationConstraints);
  }

  private parseValidationConstraints(validationConstraints: ValidationConstraints) {
    if (validationConstraints && typeof validationConstraints === 'object') {
      if (validationConstraints.global && validationConstraints.global instanceof Array) {
        this.addFormValidationFunctions(validationConstraints.global);
      }
    }
  }

  private addFormValidationFunctions(validationFunctions: FormValidationFunction[]) {
    validationFunctions.forEach((validationFunction: FormValidationFunction) => {
      if (typeof validationFunction === 'function') {
        this.validationEngine.addFormValidation(validationFunction);
      }
    });
  }

  validateField(vm: any, key: string, value: any, filter?: any) {
    return this.validationEngine.validateSingleField(vm, key, value, filter);
  }

  validateForm(vm: any) {
    return this.validationEngine.validateForm(vm);
  }

  isValidationInProgress() {
    return this.validationEngine.isValidationInProgress();
  }

  isFormDirty() {
    return this.validationEngine.isFormDirty();
  }

  isFormPristine() {
    return this.validationEngine.isFormPristine();
  }

  addFieldValidation(key: string, validationFunction: (value: string, vm: any) => FieldValidationResult) {
    this.validationEngine.addFieldValidation(key, validationFunction);
    return this;
  }

  addFieldValidationAsync(key: string, validationFunction: (value: string, vm: any) => Promise<FieldValidationResult>) {
    this.validationEngine.addFieldValidationAsync(key, validationFunction);
    return this;
  }
}

export function createFormValidation(validationConstraints: ValidationConstraints): FormValidation {
  return new BaseFormValidation(validationConstraints);
}