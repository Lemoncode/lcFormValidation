/// <reference path="./../typings/globals/es6-promise/index.d.ts"/>

declare module "lc-form-validation" {

  export class FormNameToFieldNameMapping {
    formFieldName: string;
    vmFieldName: string;
  }
  export class FieldValidation {
      validationFn: (vm, value) => Promise<FieldValidationResult>;
      filter: any;
  }

  export class FieldValidationResult {
      key : string;
      type : string;
      succeeded : boolean;
      errorMessage : string;
      constructor();
  }

  export class FormValidationResult {
      succeeded: boolean;
      fieldErrors : Array<FieldValidationResult>;
      formGlobalErrors: Array<FieldValidationResult>;
      constructor();
  }

  export interface IValidationEngine {
      initialize(formNameToFieldNameMappings : Array<FormNameToFieldNameMapping>): void;
      isFormDirty(): boolean;
      isFormPristine(): boolean;
      validateFullForm(vm: any): Promise<FormValidationResult>;
      triggerFieldValidation(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
      addFieldValidation(key : string, validation : (vm, value) => FieldValidationResult, filter? : any);
      addFieldValidationAsync(key : string, validation : (vm, value) => Promise<FieldValidationResult>, filter? : any);
      addFormValidation(validation : (vm) => FieldValidationResult);
      addFormValidationAsync(validation : (vm) => Promise<FieldValidationResult>);
      isValidationInProgress(): boolean;
  }

  export class BaseFormValidation {
      _validationEngine: IValidationEngine;
      constructor();
      validateField(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
      validateForm(vm: any): Promise<FormValidationResult>;
  }
}
