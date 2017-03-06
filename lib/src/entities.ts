import { } from 'core-js';

export class FormNameToFieldNameMapping {
  formFieldName: string;
  vmFieldName: string;
}

export class FieldValidation {
  public validationFn: (vm, value) => Promise<FieldValidationResult>;
  public filter: any;
}

export class FieldValidationResult {
  key: string;
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
