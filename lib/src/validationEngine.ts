import {
  FormValidationResult,
  FieldValidationResult,
  FieldValidation,
  FieldValidationFunction,
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
  addFieldValidation(key: string, validation: FieldValidationFunction, filter?: any): void;
  addFormValidation(validation: FormValidationFunction): void;
  isValidationInProgress(): boolean;
}

export class ValidationEngine implements IValidationEngine {

  private isFormChanged: boolean;
  private asyncValidationInProgressCount: number;
  // fieldID will be used as array index
  private validationsPerField: FieldValidationFunction[];
  private validationsGlobalForm: FormValidationFunction[];

  public constructor() {
    this.asyncValidationInProgressCount = 0;
    this.validationsPerField = [];
    this.validationsGlobalForm = [];
    this.isFormChanged = true;
  }

  isFormDirty(): boolean {
    return !this.isFormChanged;
  }

  isFormPristine(): boolean {
    return this.isFormChanged;
  }

  validateForm(viewModel: any): Promise<FormValidationResult> {

    const fullFormValidatedPromise = new Promise((resolve, reject) => {
      // Let's add fileValidationResults
      let fieldValidationResults: ValidationResult[] = validationsDispatcher.fireAllFieldsValidations(
        viewModel,
        this.validateSingleField.bind(this)
      );

      // Let's add GlobalFormValidations
      if (this.validationsGlobalForm.length > 0) {
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
    this.isFormChanged = false;
    return this.validateSingleField(vm, key, value, filter);
  }

  validateGlobalFormValidations(vm: any): ValidationResult[] {
    this.asyncValidationInProgressCount++;

    let globalFieldResultValidations: ValidationResult[] = [];

    if (this.validationsGlobalForm.length == 0) {
      this.asyncValidationInProgressCount--;
    } else {
      let fieldValidationResultsPromises = validationsDispatcher.fireGlobalFormValidations(vm, this.validationsGlobalForm);
      this.asyncValidationInProgressCount--;
      globalFieldResultValidations = [...fieldValidationResultsPromises];
    }

    return globalFieldResultValidations;
  }

  // if filter is null all validations are returned (fullform validation case)
  validateSingleField(vm: any, key: string, value: any, filter: any = null): Promise<FieldValidationResult> {
    this.asyncValidationInProgressCount++;

    let fieldValidationResultPromise = new Promise((resolve, reject) => {
      // TODO: this should be encapsulated into two separate functions, Issue #26
      if (!this.isFieldKeyMappingDefined(key)) {
        this.asyncValidationInProgressCount--;
        resolve();
      } else {
        const validationsPerFieldFiltered = fieldValidationEventFilter.filter(this.validationsPerField[key], filter);
        const onlyValidationsFn = entitiesMapper.ExtractArrayValidationFnFromFieldValidationArray(validationsPerFieldFiltered);

        validationsDispatcher.fireSingleFieldValidations(vm, value, onlyValidationsFn)
          .then((fieldValidationResult: FieldValidationResult) => {
            this.asyncValidationInProgressCount--;
            if (fieldValidationResult) {
              fieldValidationResult.key = key;
            }
            resolve(fieldValidationResult);
          })
          .catch((result) => {
            this.asyncValidationInProgressCount--;
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
    return this.validationsPerField[key] !== undefined &&
      this.validationsPerField[key] !== null;
  }

  addFieldValidation(key: string, validation: FieldValidationFunction, filter: any = consts.defaultFilter): IValidationEngine {
    const asyncValidationFn = (value, vm): Promise<ValidationResult> => {
      return Promise.resolve(validation(value, vm));
    }

    if (!this.isFieldKeyMappingDefined(key)) {
      this.validationsPerField[key] = [];
    }

    this.validationsPerField[key].push({ validationFn: asyncValidationFn, filter });
    return this;
  }

  addFormValidation(validation: FormValidationFunction): void {
    const validationAsync = (vm): Promise<FieldValidationResult> => {
      return Promise.resolve(validation(vm));
    }

    this.validationsGlobalForm.push(validation);
  }

  isValidationInProgress(): boolean {
    return (this.asyncValidationInProgressCount > 0)
  }

}
