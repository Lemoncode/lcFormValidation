import {
  FieldValidationResult,
  ValidationResult,
  FormValidationFunction,
} from './entities';
import { consts } from './consts';

class ValidationParams {
  constructor(
    public vm: any,
    public value: any,
    public validationsPerField: Array<(value, vm) => Promise<FieldValidationResult>>) {

  }
}

export class ValidationDispatcher {
  fireSingleFieldValidations(
    vm: any,
    value: any,
    validationsPerField: Array<(value, vm) => Promise<FieldValidationResult>>
  ): Promise<FieldValidationResult> {
    let validationParams = new ValidationParams(vm, value, validationsPerField);

    let fieldValidationResultPromise = new Promise((resolve, reject) => {
      if (validationsPerField && validationsPerField.length > 0) {
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
    validationParams.validationsPerField[currentIndex](validationParams.value, validationParams.vm)
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

  fireAllFieldsValidations(
    vm: Object,
    validationFn: (vm, key, value) => Promise<FieldValidationResult>
  ): Promise<FieldValidationResult>[] {

    let fieldValidationResultsPromises: Promise<FieldValidationResult>[] = [];

    if (this.areParametersDefined(vm, validationFn)) {
      for (let vmKey in vm) {
        const vmFieldValue = vm[vmKey];
        if (vmFieldValue !== undefined) {
          let fieldValidationResultsPromise = validationFn(vm, vmKey, vmFieldValue);
          fieldValidationResultsPromises.push(fieldValidationResultsPromise);
        }
      }
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
  private isLastElement(index: number, length: number) {
    return index === (length - 1);
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
