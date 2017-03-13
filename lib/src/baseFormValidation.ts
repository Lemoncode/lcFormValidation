import { ValidationEngine } from './validationEngine';
import {
  ValidationConstraints,
  FieldValidationFunction,
  FormValidationFunction,
  FieldValidationResult,
  FormValidationResult,
  FieldValidationConstraint,
} from './entities';
import { consts } from './consts';

interface FormValidation {
  validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  validateForm(vm: any): Promise<FormValidationResult>;
  isValidationInProgress(): boolean;
  isFormDirty(): boolean;
  isFormPristine(): boolean;
}

export class BaseFormValidation implements FormValidation {
  private validationEngine: ValidationEngine;
  constructor(validationConstraints: ValidationConstraints) {
    this.validationEngine = new ValidationEngine();
    this.parseValidationConstraints(validationConstraints);
  }

  private parseValidationConstraints(validationConstraints: ValidationConstraints) {
    if (validationConstraints && typeof validationConstraints === 'object') {
      const { global, fields } = validationConstraints;
      if (global && global instanceof Array) {
        this.addFormValidationFunctions(global);
      }
      if (fields && typeof fields === 'object') {
        this.addFieldValidationFunctions(fields);
      }
    }
  }

  private addFieldValidationFunctions(fields: { [key: string]: FieldValidationConstraint[] }) {
    for (let field in fields) {
      const fieldValidationConstraints = fields[field];
      if (fieldValidationConstraints instanceof Array) {
        fieldValidationConstraints.forEach(fieldValidationConstraint => {
          if (fieldValidationConstraint && typeof fieldValidationConstraint === 'object') {
            this.addFieldValidation(field, fieldValidationConstraint.validator, fieldValidationConstraint.trigger)
          }
        });
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

  validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult> {
    return this.validationEngine.validateSingleField(vm, key, value, filter);
  }

  validateForm(vm: any): Promise<FormValidationResult> {
    return this.validationEngine.validateForm(vm);
  }

  isValidationInProgress(): boolean {
    return this.validationEngine.isValidationInProgress();
  }

  isFormDirty(): boolean {
    return this.validationEngine.isFormDirty();
  }

  isFormPristine(): boolean {
    return this.validationEngine.isFormPristine();
  }

  private addFieldValidation(key: string, validationFunction: FieldValidationFunction, trigger?: Object): FormValidation {
    this.validationEngine.addFieldValidation(key, validationFunction, trigger);
    return this;
  }
}

export function createFormValidation(validationConstraints: ValidationConstraints): FormValidation {
  return new BaseFormValidation(validationConstraints);
}
