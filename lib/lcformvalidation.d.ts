export class FieldValidationResult {
  key?: string;
  type: string;
  succeeded: boolean;
  errorMessage: string;
}

export class FormValidationResult {
  succeeded: boolean;
  fieldErrors: Array<FieldValidationResult>;
  formGlobalErrors: Array<FieldValidationResult>;
}

export interface ValidationFilters {
  [key: string]: boolean;
}

interface FormValidation {
  validateField(vm: any, key: string, value: any, filter?: ValidationFilters): Promise<FieldValidationResult>;
  validateForm(vm: any): Promise<FormValidationResult>;
  isValidationInProgress(): boolean;
  isFormDirty(): boolean;
  isFormPristine(): boolean;
}

export type ValidationResult = FieldValidationResult | Promise<FieldValidationResult>;

export interface FormValidationFunction {
  (vm: any): ValidationResult;
}

export interface FieldValidationFunction {
  (value: any, vm: any, customParams: any): ValidationResult;
}

export interface FieldValidationConstraint extends Object {
  validator: FieldValidationFunction;
  eventFilters?: ValidationFilters,
  customParams?: Object
}

export interface ValidationConstraints extends Object {
  global?: FormValidationFunction[];
  fields?: { [key: string]: FieldValidationConstraint[] }
}

export function createFormValidation(validationCredentials: ValidationConstraints): FormValidation;
