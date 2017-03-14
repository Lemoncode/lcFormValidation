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

interface FormValidation {
  validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
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
  (value: any, vm: any): ValidationResult;
}

export interface FieldValidationConstraint extends Object {
  validator: FieldValidationFunction;
  trigger?: { [key: string]: boolean },
  customParams?: Object
}

export interface ValidationConstraints extends Object {
  global?: FormValidationFunction[];
  fields?: { [key: string]: FieldValidationConstraint[] }
}

export interface ValidationFilter {
  [key: string]: boolean;
}

export function createFormValidation(validationCredentials: ValidationConstraints): FormValidation;

