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

export interface ValidationEventsFilter {
  [key: string]: boolean;
}

interface FormValidation {
  validateField(vm: any, key: string, value: any, eventsFilter?: ValidationEventsFilter): Promise<FieldValidationResult>;
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

export interface FieldValidationConstraint {
  validator: FieldValidationFunction;
  eventsFilter?: ValidationEventsFilter;
  customParams?: any;
}

export interface ValidationConstraints {
  global?: FormValidationFunction[];
  fields?: { [key: string]: FieldValidationConstraint[] }
}

export function createFormValidation(validationCredentials: ValidationConstraints): FormValidation;

export interface LengthParams {
  length: number;
}

export interface PatternParams {
  pattern: string | RegExp;
}

export interface RequiredParams {
  trim: boolean;
}

export namespace Validators {
  function required(value: any, vm: any, customParams: RequiredParams): FieldValidationResult;
  function minLength(value: any, vm: any, customParams: LengthParams): FieldValidationResult;
  function maxLength(value: any, vm: any, customParams: LengthParams): FieldValidationResult;
  function email(value: any, vm: any): FieldValidationResult;
  function pattern(value: any, vm: any, customParams: PatternParams): FieldValidationResult;
}
