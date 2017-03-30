export interface ValidationEventsFilter {
  [key: string]: boolean;
}

export class FieldValidation {
  validationFn: (value, vm, customParams) => Promise<FieldValidationResult>;
  eventsFilter: ValidationEventsFilter;
  customParams: any;
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
  fieldErrors: FieldValidationResult[];
  formGlobalErrors: FieldValidationResult[];

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
  (value: any, vm: any, customParams: any): ValidationResult;
}

export interface FieldValidationConstraint {
  validator: FieldValidationFunction;
  eventsFilter?: ValidationEventsFilter;
  customParams?: any;
}

export interface ValidationConstraints {
  global?: FormValidationFunction[];
  fields?: { [key: string]: FieldValidationConstraint[] };
}
