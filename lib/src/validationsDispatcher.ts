import {
  FieldValidationResult,
  ValidationResult,
  FormValidationFunction,
  FieldValidationFunction,
  FieldValidation,
} from './entities';
import { consts } from './consts';

class ValidationParams {
  constructor(
    public vm: any,
    public value: any,
    public validationsPerField: FieldValidation[]) {
  }
}

export class ValidationDispatcher {
  fireSingleFieldValidations(
    vm: any,
    value: any,
    fieldValidations: FieldValidation[],
  ): Promise<FieldValidationResult> {
    let validationParams = new ValidationParams(vm, value, fieldValidations);

    let fieldValidationResultPromise = new Promise((resolve, reject) => {
      if (fieldValidations && fieldValidations.length > 0) {
        this.fireSingleValidation(resolve, reject, validationParams, 0)
      } else {
        resolve();
      }
    });

    return fieldValidationResultPromise;
  }

  private fireSingleValidation(
    resolve: any,
    reject: any,
    validationParams: ValidationParams,
    currentIndex: number
  ): void {
    const fieldValidation = validationParams.validationsPerField[currentIndex];
    fieldValidation.validationFn(validationParams.value, validationParams.vm, fieldValidation.customParams)
      .then(fieldValidationResult => {
        if (this.fieldValidationFailedOrLastOne(fieldValidationResult, currentIndex, validationParams.validationsPerField.length)) {
          resolve(fieldValidationResult);
        } else {
          currentIndex++;
          this.fireSingleValidation(resolve, reject, validationParams, currentIndex);
        }
      }).catch(() => {
        reject(currentIndex);
      });
  }

  private fieldValidationFailedOrLastOne(fieldValidationResult: FieldValidationResult, index: number, numberOfItems: number) {
    return !fieldValidationResult ||
      !fieldValidationResult.succeeded ||
      this.isLastElement(index, numberOfItems);
  }

  //TODO: Extract to bussines?
  private isLastElement(index: number, length: number) {
    return index === (length - 1);
  }

  fireAllFieldsValidations(
    vm: any,
    fieldsToValidate: string[],
    validationFn: (vm, key, value) => Promise<FieldValidationResult>
  ): Promise<FieldValidationResult>[] {

    const fieldValidationResultsPromises: Promise<FieldValidationResult>[] = [];

    if (this.areParametersDefined(vm, validationFn)) {
      fieldsToValidate.forEach((field) => {
        const vmFieldValue = vm[field];
        if (vmFieldValue !== undefined) {
          const fieldValidationResultsPromise = validationFn(vm, field, vmFieldValue);
          fieldValidationResultsPromises.push(fieldValidationResultsPromise);
        }
      });
    }

    return fieldValidationResultsPromises;
  }

  fireGlobalFormValidations(vm: any, validations: FormValidationFunction[])
    : ValidationResult[] {

    let validationResultsPromises: ValidationResult[] = [];

    //NOTE: Delegate into validationFn if vm is null, undefined, etc..
    if (this.areParametersDefined(validations)) {
      validations.forEach((validationFn) => {
        validationResultsPromises.push(validationFn(vm));
      });
    }

    return validationResultsPromises;
  }

  //TODO: Extract to bussines?
  private areParametersDefined(...parameters) {
    return parameters.every(parameter => parameter);
  }
}

let validationsDispatcher = new ValidationDispatcher();

export {
  validationsDispatcher
}
