import { } from 'core-js';
import {
  createFormValidation,
  FieldValidationResult,
  ValidationConstraints,
  FieldValidationFunction,
} from 'lc-form-validation';
import { gitHub } from '../../../api/gitHub';

function requiredValidationHandler(value: string): FieldValidationResult {
  const isFieldInformed = (value && value.trim().length > 0);
  const errorInfo = (isFieldInformed) ? '' : 'Mandatory field';

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
    .then((loginExists) => resolveLoginExists(loginExists))
    .catch(error => console.log('ERROR', error));
}

function resolveLoginExists(loginExists: boolean): Promise<FieldValidationResult> {
  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'USER_GITHUB';
  fieldValidationResult.succeeded = !loginExists;
  fieldValidationResult.errorMessage = (loginExists) ? 'This user exists on GitHub' : '';
  return Promise.resolve(fieldValidationResult);
}

interface lengthConstraintParams {
  minLength: number;
  maxLength: number;
}
const lengthConstraint: lengthConstraintParams = {
  minLength: 4,
  maxLength: 10
};
const minLengthValidationHandler: FieldValidationFunction = (password: string, vm, customParams: lengthConstraintParams) => {
  const { minLength, maxLength } = customParams;
  const isValidMinLength = password.length >= minLength;
  const isValidMaxLength = password.length <= maxLength;
  const minLengthErrorMessage = `Minimum ${minLength} characters required`;
  const maxLengthErrorMessage = `Maximum ${maxLength} characters length`;
  let errorMessage = isValidMaxLength
    ? isValidMinLength ? '' : minLengthErrorMessage
    : maxLengthErrorMessage;

  const fieldValidationResult: FieldValidationResult = new FieldValidationResult();
  fieldValidationResult.type = 'PASSWORD_LENGTH';
  fieldValidationResult.succeeded = isValidMinLength && isValidMaxLength;
  fieldValidationResult.errorMessage = errorMessage;
  return Promise.resolve(fieldValidationResult);
};

const signupValidationConstraints: ValidationConstraints = {
  fields: {
    password: [
      { validator: requiredValidationHandler },
      {
        validator: minLengthValidationHandler,
        customParams: lengthConstraint,
      },
    ],
    confirmPassword: [
      { validator: requiredValidationHandler },
      { validator: passwordAndConfirmPasswordValidationHandler },
    ],
    login: [
      {
        validator: requiredValidationHandler,
        eventFilters: { OnChange: true, OnBlur: true },
      },
      {
        validator: loginExistOnGitHubValidationHandler,
        eventFilters: { OnBlur: true }
      },
    ]
  }
};

const signupFormValidation = createFormValidation(signupValidationConstraints);

export {
  signupFormValidation
}
