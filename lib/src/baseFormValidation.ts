import { ValidationEngine } from './validationEngine';
import {
  ValidationConstraints,
  FieldValidationFunction,
  FormValidationFunction,
  FieldValidationResult,
  FormValidationResult,
  FieldValidationConstraint,
  ValidationEventsFilter,
} from './entities';
import { consts } from './consts';

interface FormValidation {
  validateField(vm: any, key: string, value: any, eventsFilter?: any): Promise<FieldValidationResult>;
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
        this.parseFormValidations(global);
      }
      if (fields && typeof fields === 'object') {
        this.parseAllFieldsValidations(fields);
      }
    }
  }

  private parseFormValidations(validationFunctions: FormValidationFunction[]) {
    validationFunctions.forEach((validationFunction: FormValidationFunction) => {
      if (typeof validationFunction === 'function') {
        this.validationEngine.addFormValidation(validationFunction);
      }
    });
  }

  private parseAllFieldsValidations(fields: { [key: string]: FieldValidationConstraint[] }) {
    for (let field in fields) {
      this.parseFieldValidations(field, fields[field]);
    }
  }

  private parseFieldValidations(field: string, fieldValidationConstraints: FieldValidationConstraint[]) {
    if (fieldValidationConstraints instanceof Array) {
      fieldValidationConstraints.forEach((fieldValidationConstraint) => {
        if (fieldValidationConstraint && typeof fieldValidationConstraint === 'object') {
          this.addFieldValidation(field, fieldValidationConstraint);
        }
      });
    }
  }

  private addFieldValidation(field: string, validationConstraint: FieldValidationConstraint): FormValidation {
    this.validationEngine.addFieldValidation(
      field,
      validationConstraint.validator,
      validationConstraint.eventsFilter,
      validationConstraint.customParams
    );
    return this;
  }

  validateField(vm: any, key: string, value: any, eventsFilter?: ValidationEventsFilter): Promise<FieldValidationResult> {
    return this.validationEngine.validateField(vm, key, value, eventsFilter);
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
