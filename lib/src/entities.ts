export interface ValidationFilter {
  [key: string]: boolean;
}

export class FieldValidation {
  public validationFn: (value, vm) => Promise<FieldValidationResult>;
  public filter: ValidationFilter;
}

export class FieldValidationResult {
  key?: string;
  type: string;
  succeeded: boolean;
  errorMessage: string;

  constructor() {
    this.key = '';
    this.type = '';
    this.succeeded = false;
    this.errorMessage = '';
  }
}

export class FormValidationResult {
  succeeded: boolean;
  fieldErrors: Array<FieldValidationResult>;
  formGlobalErrors: Array<FieldValidationResult>;

  constructor() {
    this.succeeded = false;
    this.fieldErrors = [];
  }
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
  fields?: { [key: string]: FieldValidationConstraint[] };
}
