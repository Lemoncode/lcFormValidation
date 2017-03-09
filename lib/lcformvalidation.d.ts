import { } from 'core-js';

export class FormNameToFieldNameMapping {
  formFieldName: string;
  vmFieldName: string;
}

export class FieldValidation {
  validationFn: (vm, value) => Promise<FieldValidationResult>;
  filter: any;
}

export class FieldValidationResult {
  key?: string;
  type: string;
  succeeded: boolean;
  errorMessage: string;
  constructor();
}

export class FormValidationResult {
  succeeded: boolean;
  fieldErrors: Array<FieldValidationResult>;
  formGlobalErrors: Array<FieldValidationResult>;
  constructor();
}

export interface IValidationEngine {
  isFormDirty(): boolean;
  isFormPristine(): boolean;
  validateForm(vm: any): Promise<FormValidationResult>;
  triggerFieldValidation(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  addFieldValidation(key: string, validation: (vm, value) => FieldValidationResult, filter?: any): IValidationEngine;
  addFieldValidationAsync(key: string, validation: (vm, value) => Promise<FieldValidationResult>, filter?: any): IValidationEngine;
  addFormValidation(validation: FormValidationFunction);
  isValidationInProgress(): boolean;
}

export interface FormValidation {
  validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  validateForm(vm: any): Promise<FormValidationResult>;
  isValidationInProgress(): boolean;
  isFormDirty(): boolean;
  isFormPristine(): boolean;
  addFieldValidation(key: string, validation: (value: string, vm: any) => FieldValidationResult, filter?: any): FormValidation;
  addFieldValidationAsync(key: string, validation: (value: string, vm: any) => Promise<FieldValidationResult>, filter?: any): FormValidation;
}

export type ValidationResult = FieldValidationResult | Promise<FieldValidationResult>;

export interface FormValidationFunction {
  (vm: any): ValidationResult;
}

export interface ValidationConstraints extends Object {
  global?: FormValidationFunction[];
}

export function createFormValidation(validationCredentials: ValidationConstraints): FormValidation;