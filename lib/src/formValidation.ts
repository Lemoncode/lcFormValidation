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
  addFieldValidation(key: string, validation: (value: string, vm: any) => FieldValidationResult);
  addFieldValidationAsync(key: string, validation: (value: string, vm: any) => Promise<FieldValidationResult>);
}

export function createFormValidation(validationConstraints: ValidationConstraints): FormValidation {
  const validationEngine = new ValidationEngine();

  if (validationConstraints.hasOwnProperty('global')) {
    validationConstraints.global.forEach((validationFunction) => {
      if (typeof validationFunction === 'function') {
        validationEngine.addFormValidationAsync(validationFunction);
      }
    });
  }

  return {
    validateField: validationEngine.triggerFieldValidation,
    validateForm: validationEngine.validateFullForm,
    isValidationInProgress: validationEngine.isValidationInProgress,
    isFormDirty: validationEngine.isFormDirty,
    isFormPristine: validationEngine.isFormPristine,
    addFieldValidation: validationEngine.addFieldValidation,
    addFieldValidationAsync: validationEngine.addFieldValidationAsync,
  };
}