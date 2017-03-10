import { } from 'core-js';
import {
  FormValidationResult,
  FieldValidationResult,
  FieldValidation,
  ValidationResult,
  FormValidationFunction,
} from "./entities";
import { consts } from './consts';
import { validationsDispatcher } from './validationsDispatcher';
import { validationsResultBuilder } from './validationsResultBuilder';
import { fieldValidationEventFilter } from './fieldValidationEventFilter';
import { entitiesMapper } from './entitiesMapper';

export interface IValidationEngine {
  isFormDirty(): boolean;
  isFormPristine(): boolean;
  validateForm(vm: any): Promise<FormValidationResult>;
  triggerFieldValidation(vm: any, key: string, value: any, filter?: any): Promise<FieldValidationResult>;
  // TODO: Implement Issue #15
  addFieldValidation(key: string, validation: (value, vm) => FieldValidationResult, filter?: any): void;
  addFieldValidationAsync(key: string, validation: (value, vm) => Promise<FieldValidationResult>, filter?: any): void;
  addFormValidation(validation: FormValidationFunction): void;
  isValidationInProgress(): boolean;
}

export class ValidationEngine implements IValidationEngine {

  _isFormPristine: boolean;
  _asyncValidationInProgressCount: number;
  // fieldID will be used as array index
  _validationsPerField: Array<FieldValidation>;
  _validationsGlobalForm: FormValidationFunction[];

  public constructor() {
    this._asyncValidationInProgressCount = 0;
    this._validationsPerField = [];
    this._validationsGlobalForm = [];
    this._isFormPristine = true;
  }

  isFormDirty(): boolean {
    return !this._isFormPristine;
  }

  isFormPristine(): boolean {
    return this._isFormPristine;
  }

  validateForm(viewModel: any): Promise<FormValidationResult> {

    const fullFormValidatedPromise = new Promise((resolve, reject) => {
      // Let's add fileValidationResults
      let fieldValidationResults: ValidationResult[] = validationsDispatcher.fireAllFieldsValidations(
        viewModel,
        this.validateSingleField.bind(this)
      );

      // Let's add GlobalFormValidations
      if (this._validationsGlobalForm.length > 0) {
        fieldValidationResults = [...fieldValidationResults, ...this.validateGlobalFormValidations(viewModel)];
      }

      // TODO: Implement Issue #16 - Error handling

      // Once all the single field validations have been resolved
      // resolve the fullFormValidatePromise
      Promise.all(fieldValidationResults)
        .then((fieldValidationResults: FieldValidationResult[]) => {
          let formValidationResult = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);
          resolve(formValidationResult);
        })
        .catch((result) => {
          // Build failed validation Result
          var errorInformation = `Uncontrolled error when validating full form, check custom validations code`;
          console.log(errorInformation);
          reject(errorInformation);
        });

    });

    return fullFormValidatedPromise;
  }

  triggerFieldValidation(vm: any, key: string, value: any, filter: any = consts.defaultFilter): Promise<FieldValidationResult> {
    // updated dirty flag and perform validation
    this._isFormPristine = false;
    return this.validateSingleField(vm, key, value, filter);
  }

  validateGlobalFormValidations(vm: any): ValidationResult[] {
    this._asyncValidationInProgressCount++;

    let globalFieldResultValidations: ValidationResult[] = [];

    if (this._validationsGlobalForm.length == 0) {
      this._asyncValidationInProgressCount--;
    } else {
      let fieldValidationResultsPromises = validationsDispatcher.fireGlobalFormValidations(vm, this._validationsGlobalForm);
      this._asyncValidationInProgressCount--;
      globalFieldResultValidations = [...fieldValidationResultsPromises];
    }

    return globalFieldResultValidations;
  }

  // if filter is null all validations are returned (fullform validation case)
  validateSingleField(vm: any, key: string, value: any, filter: any = null): Promise<FieldValidationResult> {
    this._asyncValidationInProgressCount++;

    let fieldValidationResultPromise = new Promise((resolve, reject) => {
      // TODO: this should be encapsulated into two separate functions, Issue #26
      if (!this.isFieldKeyMappingDefined(key)) {
        this._asyncValidationInProgressCount--;
        resolve();
      } else {
        const validationsPerFieldFiltered = fieldValidationEventFilter.filter(this._validationsPerField[key], filter);
        const onlyValidationsFn = entitiesMapper.ExtractArrayValidationFnFromFieldValidationArray(validationsPerFieldFiltered);

        validationsDispatcher.fireSingleFieldValidations(vm, value, onlyValidationsFn)
          .then((fieldValidationResult: FieldValidationResult) => {
            this._asyncValidationInProgressCount--;
            if (fieldValidationResult) {
              fieldValidationResult.key = key;
            }
            resolve(fieldValidationResult);
          })
          .catch((result) => {
            this._asyncValidationInProgressCount--;
            // Build failed validation Result
            var errorInformation = `Validation Exception, field: ${key} validation fn Index: ${key}`;
            console.log(errorInformation);
            reject(result);
          });
      }
    });

    return fieldValidationResultPromise;
  }

  isFieldKeyMappingDefined(key: string): boolean {
    return this._validationsPerField[key] !== undefined &&
      this._validationsPerField[key] !== null;
  }

  addFieldValidation(key: string, validation: (value, vm) => FieldValidationResult, filter: any = consts.defaultFilter): IValidationEngine {
    const validationAsync = (value, vm): Promise<FieldValidationResult> => {
      return Promise.resolve(validation(value, vm));
    }

    this.addFieldValidationAsync(key, validationAsync, filter);
    return this;
  }

  addFieldValidationAsync(key: string, validation: (value, vm) => Promise<FieldValidationResult>, filter: any = consts.defaultFilter): IValidationEngine {
    if (!this.isFieldKeyMappingDefined(key)) {
      this._validationsPerField[key] = [];
    }

    this._validationsPerField[key].push({ validationFn: validation, filter: filter });
    return this;
  }

  addFormValidation(validation: FormValidationFunction): void {
    const validationAsync = (vm): Promise<FieldValidationResult> => {
      return Promise.resolve(validation(vm));
    }

    this._validationsGlobalForm.push(validation);
  }

  isValidationInProgress(): boolean {
    return (this._asyncValidationInProgressCount > 0)
  }

}
