import { FieldValidationResult, FieldValidationFunction } from '../entities';

// RegExp from http://emailregex.com
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email: FieldValidationFunction = (value: string) => {
  const validationResult = new FieldValidationResult();
  const isValid = isValidEmail(value);

  validationResult.succeeded = isValid;
  validationResult.type = 'EMAIL';
  validationResult.errorMessage = isValid ? '' : 'Please enter a valid email address.';
  return validationResult;
};

function isValidEmail(value): boolean {
  return isEmptyValue(value) ?
    true :
    EMAIL_PATTERN.test(value);
}

function isEmptyValue(value): boolean {
  return value === null ||
    value === undefined ||
    value === '';
}
