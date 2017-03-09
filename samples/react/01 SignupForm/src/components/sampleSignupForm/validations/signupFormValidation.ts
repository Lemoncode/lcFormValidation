import { } from 'core-js';
import { createFormValidation, FieldValidationResult } from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

const signupFormValidation = createFormValidation(null);
signupFormValidation
  .addFieldValidation('password', (value, vm): FieldValidationResult => {
    return requiredValidationHandler(value, vm);
  })
  .addFieldValidation('confirmPassword', (value, vm): FieldValidationResult => {
    return passwordAndConfirmPasswordValidationHandler(value, vm);
  })
  .addFieldValidation('confirmPassword', (value, vm): FieldValidationResult => {
    return requiredValidationHandler(value, vm);
  })
  .addFieldValidationAsync('login', (value, vm): Promise<FieldValidationResult> => {
    return loginExistOnGitHubValidationHandler(value, vm);
  }, { OnBlur: true })
  .addFieldValidation('login', (value, vm): FieldValidationResult => {
    return requiredValidationHandler(value, vm);
  }, { OnChange: true, OnBlur: true });

function requiredValidationHandler(value: any, vm: any): FieldValidationResult {
  const isFieldInformed: boolean = (value != null && value.length > 0);
  const errorInfo: string = (isFieldInformed) ? '' : 'Mandatory field';

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'REQUIRED';
  fieldValidationResult.succeeded = isFieldInformed;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
}

function passwordAndConfirmPasswordValidationHandler(value: any, vm: any): FieldValidationResult {
  const passwordAndConfirmPasswordAreEqual: boolean = vm.password === value;
  const errorInfo: string = (passwordAndConfirmPasswordAreEqual) ? '' : 'Passwords do not match';

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'PASSWORD_MATCH';
  fieldValidationResult.succeeded = passwordAndConfirmPasswordAreEqual;
  fieldValidationResult.errorMessage = errorInfo;

  return fieldValidationResult;
}

function loginExistOnGitHubValidationHandler(value: any, vm: any): Promise<FieldValidationResult> {
  return gitHub.doesLoginExists(value)
    .then((loginExists) => this.resolveLoginExists(loginExists));
}

function resolveLoginExists(loginExists: boolean): Promise<FieldValidationResult> {
  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'USER_GITHUB';
  fieldValidationResult.succeeded = !loginExists;
  fieldValidationResult.errorMessage = (loginExists) ? 'This user exists on GitHub' : '';
  return Promise.resolve(fieldValidationResult);
}

export {
  signupFormValidation
}
