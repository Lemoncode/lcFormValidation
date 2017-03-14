import { ValidationEngine } from './validationEngine';
import {
  ValidationConstraints,
  FieldValidationFunction,
  FormValidationFunction,
  FieldValidationResult,
  FormValidationResult,
  FieldValidationConstraint,
  ValidationFilter,
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
        fieldValidationConstraints.forEach((fieldValidationConstraint) => {
          if (fieldValidationConstraint && typeof fieldValidationConstraint === 'object') {
            this.addFieldValidation(field, fieldValidationConstraint.validator, fieldValidationConstraint.eventFilter);
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

  private addFieldValidation(key: string, validationFunction: FieldValidationFunction, eventFilter?: ValidationFilter): FormValidation {
    this.validationEngine.addFieldValidation(key, validationFunction, eventFilter);
    return this;
  }

  validateField(vm: any, key: string, value: any, filter?: ValidationFilter): Promise<FieldValidationResult> {
    return this.validationEngine.triggerFieldValidation(vm, key, value, filter);
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
}

export function createFormValidation(validationConstraints: ValidationConstraints): FormValidation {
  return new BaseFormValidation(validationConstraints);
}
