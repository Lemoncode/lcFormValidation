import {
  FormValidationResult,
  FieldValidationResult,
  FieldValidation,
  FieldValidationFunction,
  ValidationResult,
  FormValidationFunction,
  ValidationEventsFilter,
} from "./entities";
import { consts } from './consts';
import { validationsDispatcher } from './validationsDispatcher';
import { validationsResultBuilder } from './validationsResultBuilder';
import { fieldValidationEventFilter } from './fieldValidationEventFilter';

export interface IValidationEngine {
  isFormDirty(): boolean;
  isFormPristine(): boolean;
  isValidationInProgress(): boolean;
  validateForm(vm: any): Promise<FormValidationResult>;
  validateField(vm: any, key: string, value: any, eventsFilter?: ValidationEventsFilter): Promise<FieldValidationResult>;
  addFieldValidation(key: string, validation: FieldValidationFunction, eventsFilter?: ValidationEventsFilter): void;
  addFormValidation(validation: FormValidationFunction): void;
  isValidationInProgress(): boolean;
}

export class ValidationEngine implements IValidationEngine {

  private isFormChanged: boolean;
  private asyncValidationInProgressCount: number;
  // fieldID will be used as array index
  private validationsPerField: { [key: string]: FieldValidation[] };
  private validationsGlobalForm: FormValidationFunction[];

  public constructor() {
    this.asyncValidationInProgressCount = 0;
    this.validationsPerField = {};
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
        Object.keys(this.validationsPerField),
        this.fireFieldValidations.bind(this)
      );

      // Let's add GlobalFormValidations
      if (this.validationsGlobalForm.length > 0) {
        fieldValidationResults = [...fieldValidationResults, ...this.validateGlobalFormValidations(viewModel)];
      }

      // Once all the single field validations have been resolved
      // resolve the fullFormValidatePromise
      Promise.all(fieldValidationResults)
        .then((fieldValidationResults: FieldValidationResult[]) => {
          let formValidationResult = validationsResultBuilder.buildFormValidationsResult(fieldValidationResults);
          resolve(formValidationResult);
        })
        .catch((result) => {
          // Build failed validation Result
          const errorInformation = `Uncontrolled error when validating full form, check custom validations code`;
          console.log(errorInformation);
          reject(result);
        });
    });

    return fullFormValidatedPromise;
  }

  private validateGlobalFormValidations(vm: any): ValidationResult[] {
    this.asyncValidationInProgressCount++;

    let globalFieldResultValidations: ValidationResult[] = [];

    if (this.validationsGlobalForm.length == 0) {
      this.asyncValidationInProgressCount--;
    } else {
      const fieldValidationResultsPromises = validationsDispatcher.fireGlobalFormValidations(vm, this.validationsGlobalForm);
      this.asyncValidationInProgressCount--;
      globalFieldResultValidations = [...fieldValidationResultsPromises];
    }

    return globalFieldResultValidations;
  }

  validateField(vm: any, key: string, value: any, filters: ValidationEventsFilter = consts.defaultFilter): Promise<FieldValidationResult> {
    // updated dirty flag and perform validation
    this.isFormChanged = false;
    return this.fireFieldValidations(vm, key, value, filters);
  }

  // if filter is null all validations are returned (fullform validation case)
  private fireFieldValidations(vm: any, key: string, value: any, filters: ValidationEventsFilter = null): Promise<FieldValidationResult> {
    this.asyncValidationInProgressCount++;

    const fieldValidationResultPromise = new Promise((resolve, reject) => {
      // TODO: this should be encapsulated into two separate functions
      if (!this.isFieldKeyMappingDefined(key)) {
        this.asyncValidationInProgressCount--;
        resolve();
      } else {
        const filteredFieldValidations = fieldValidationEventFilter.filter(this.validationsPerField[key], filters);

        validationsDispatcher.fireSingleFieldValidations(vm, value, filteredFieldValidations)
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

  addFieldValidation(
    key: string,
    validation: FieldValidationFunction,
    eventsFilter: ValidationEventsFilter = consts.defaultFilter,
    customParams: any = {},
  ): IValidationEngine {
    const asyncValidationFn = (value, vm, customParams): Promise<ValidationResult> => {
      return Promise.resolve(validation(value, vm, customParams));
    }

    if (!this.isFieldKeyMappingDefined(key)) {
      this.validationsPerField[key] = [];
    }

    this.validationsPerField[key].push({ validationFn: asyncValidationFn, eventsFilter, customParams });
    return this;
  }

  isFieldKeyMappingDefined(key: string): boolean {
    return this.validationsPerField[key] !== undefined &&
      this.validationsPerField[key] !== null;
  }

  addFormValidation(validation: FormValidationFunction): void {
    const validationAsync = (vm): Promise<FieldValidationResult> => {
      return Promise.resolve(validation(vm));
    }

    this.validationsGlobalForm.push(validationAsync);
  }

  isValidationInProgress(): boolean {
    return (this.asyncValidationInProgressCount > 0);
  }
}
